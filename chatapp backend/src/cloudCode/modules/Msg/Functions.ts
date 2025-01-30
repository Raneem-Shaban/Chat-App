import { log } from 'console';
import Conversation from '../../models/Conversation';
// import Employee from '../../models/Employee';
import Msg from '../../models/Msg';
import User from '../../models/User';

Parse.Cloud.beforeSave(
  Msg,
  async req => {
    const object = req.object;
    const user = req.user as User;
    const sessionToken = req.user?.getSessionToken();

    const usersList = [object.reciver, user];
    console.log(usersList);

    let conversation = await new Parse.Query(Conversation)
      .containedBy('users', usersList)
      .first({sessionToken: sessionToken});
    console.log(conversation);
    if (!conversation) {
      const newConversation = new Conversation();

      newConversation.users = usersList;

      const conversation_acl = new Parse.ACL();
      conversation_acl.setPublicReadAccess(false);
      conversation_acl.setPublicWriteAccess(false);
      conversation_acl.setReadAccess(user, true);
      conversation_acl.setReadAccess(object.reciver, true);
      conversation_acl.setWriteAccess(user, true);
      conversation_acl.setWriteAccess(object.reciver, true);

      newConversation.setACL(conversation_acl);

      newConversation.pinnedMsg = null;
      conversation = await newConversation.save();
    }

    object.conversation = conversation;

    // const acl = new Parse.ACL();
    // acl.setPublicReadAccess(false);
    // acl.setPublicWriteAccess(true);

    // acl.setReadAccess(user, true);
    // acl.setWriteAccess(user, true);
    // acl.setReadAccess(object.reciver.id, true);

    // object.setACL(acl);
  },
  {
    requireUser: true,
    fields: {
      text: {
        type: String,
        required: true,
        options: (val: string) => {
          if (val.length <= 0) {
            throw 'Invalid MSG';
          }
        },
      },
      reciver: {
        type: Object,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        required: false,
        default : false
      },
      isSaved: {
        type: Boolean,
        required: false,
        default : false
      },
    },
  }
);


Parse.Cloud.define('getConversations', async req => {
  const user = req.user as Parse.User;
  const sessionToken = req.user?.getSessionToken();

  const loggedInUserId = user.id;


  const query = new Parse.Query("Conversation");
  query.include("users");

  const conversations = await query.find({ sessionToken: sessionToken });
  let userArray: any = [];
  for (const conversation of conversations) {
    const users = conversation.get("users");
    const updatedUsers = users.filter((u: any) => u.id !== loggedInUserId);

    userArray.push({
      id: conversation,
      message: ""
    });
  }

  const msgsQuery: any = [];
  conversations.forEach((conversation) => {
    msgsQuery.push(
      new Parse.Query(Msg)
       .equalTo('conversation', conversation)
       .descending('createdAt')
       .select('-reciver', "text", '-conversation','-updatedAt','isSeen')
       .first({ sessionToken: sessionToken })
    );
  });
  let msgs = await Promise.all(msgsQuery);
  msgs.forEach((msg, index) => {
    userArray[index].message = msg;
  });

  return { userArray };
});
Parse.Cloud.define('getMsgs', async req => {
  const conversationId = req.params.conversation;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let conversation = await new Parse.Query(Conversation).get(conversationId, {
    useMasterKey: true,
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const messages = await new Parse.Query(Msg).equalTo('conversation', conversation).notEqualTo('isDeleted',true ).find({sessionToken: sessionToken})
  return messages;
});

Parse.Cloud.define('deleteMsg', async req => {
  const msgId = req.params.msg;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let msg = await new Parse.Query(Msg).get(msgId, {
    useMasterKey: true,
  });

  if (!msg) {
    throw new Error('Msg not found');
  }
  console.log(msg);
  
  await msg.save({
    'isDeleted': true
  }, {  sessionToken: sessionToken  });
  return 'ok'
});
//------------------------------Saved Msgs

Parse.Cloud.define('getSavedMsg', async req => {

  const sessionToken = req.user?.getSessionToken();
  const savedMessages = await new Parse.Query(Msg).equalTo('isSaved', true).find({sessionToken: sessionToken})
  return savedMessages
});
Parse.Cloud.define('saveMsg', async req => {
  const msgId = req.params.msg;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let msg = await new Parse.Query(Msg).get(msgId, {
    useMasterKey: true,
  });

  if (!msg) {
    throw new Error('Msg not found');
  }
  await msg.save({
    'isSaved': true
  }, {  sessionToken: sessionToken  });
  return 'ok'
});
Parse.Cloud.define('unSaveMsg', async req => {
  const msgId = req.params.msg;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let msg = await new Parse.Query(Msg).get(msgId, {
    useMasterKey: true,
  });

  if (!msg) {
    throw new Error('Msg not found');
  }
  await msg.save({
    'isSaved': false
  }, {  sessionToken: sessionToken  });
  return 'ok'
});
//------------------------pinned Msgs-------------------

Parse.Cloud.define('pinMsg', async req => {
  const msgId = req.params.msg;
  const conversationId = req.params.conversation;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let conversation = await new Parse.Query(Conversation).get(conversationId, {
    useMasterKey: true,
  });

  if (!conversation) {
    throw new Error('conversation not found');
  }
  console.log(conversation);

  const pinnedMsg = new Parse.Object("Msg");
  pinnedMsg.id = msgId.objectId;

  await conversation.save({
    pinnedMsg: pinnedMsg.id
  }, { sessionToken: sessionToken });
  return 'ok'
});

Parse.Cloud.define('getPinnedMsg', async req => {
  const conversationId = req.params.conversation;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();

  let conversation = await new Parse.Query(Conversation).get(conversationId, {
    useMasterKey: true,
  });
  if (!conversation) {
    throw new Error('conversation not found');
  }

  const message = await new Parse.Query(Msg).equalTo('objectId', conversation.pinnedMsg.id).find({sessionToken: sessionToken})
  return message
});



Parse.Cloud.define('searchUser', async req => {
  const username = req.params.username;
  const user = req.user as User;
  const sessionToken = req.user?.getSessionToken();


  const foundUser = await new Parse.Query(User).equalTo('username', username).find({sessionToken: sessionToken})
  console.log(foundUser)
  return foundUser
});
