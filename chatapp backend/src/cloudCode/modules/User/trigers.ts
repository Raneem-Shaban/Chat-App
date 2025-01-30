import { Object } from "parse"; 

 Parse.Cloud.beforeSave(Parse.User, 
    async req =>{ 
        const object=req.object 
        const user_acl = new Parse.ACL(); 
        user_acl.setPublicReadAccess(true); 
        object.setACL(user_acl); 
    } 
 )