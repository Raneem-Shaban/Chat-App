import Msg from './Msg';
import User from './User';

export default class Conversation extends Parse.Object {
  constructor() {
    super('Conversation');
  }

  get users(): User[] {
    return super.get('users');
  }
  set users(value: User[]) {
    super.set('users', value);
  }
  get isTyping(): User[] {
    return super.get('isTyping');
  }
  set isTyping(value: User[]) {
    super.set('isTyping', value);
  }
  get pinnedMsg() {
    return super.get('pinnedMsg');
  }
  set pinnedMsg(value) {
    super.set('pinnedMsg', value);
  }
}

Parse.Object.registerSubclass('Conversation', Conversation);
