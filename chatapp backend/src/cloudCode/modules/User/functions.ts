import User from '../../models/User';

import {generateRandomInteger} from '../../utils/generateRandom';

Parse.Cloud.define('getUsers', async req => {
    const users = await new Parse.Query(User).find();
  
    return users;
  });