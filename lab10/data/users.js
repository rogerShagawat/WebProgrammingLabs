//import mongo collections, bcrypt and implement the following data functions

/*
[
  { 
    _id: ObjectId("615f5211445eac188610ecbe"),
    firstName: 'Patrick',
    lastName: 'Hill',  
    emailAddress: 'phill@stevens.edu', 
    password: '$2b$16$Vm/Xqc.2eyi3y3IqewuhjOTXeoxt4SaN1dcAfPwEPUrzA5Kgm1HFW',
    role: 'admin'
  },
  { 
    _id: ObjectId("615f5211445eac188610ecc0"), 
    firstName: 'Aiden',
    lastName: 'Hill',
    emailAddress: 'aidenhill@gmail.com', 
    password: '$2b$16$SHQUG43PoIHoTHvkeDBczewvurYf3l.XKMRhrRomB.iVMcvldsq8m',
    role: 'user'
  }
];
*/

import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import help from "../helpers.js";
const saltRounds = 12; 

export const registerUser = async (
   firstName,
   lastName,
   emailAddress,
   password,
   role
) => {
   firstName = help.checkIsProperName(firstName, "registerUser firstName");
   lastName = help.checkIsProperName(lastName, "registerUser lastName");
   emailAddress = help.checkIsProperEmail(
      emailAddress,
      "registerUser emailAdress"
   );
   password = help.checkIsProperPassword(password, "registerUser password");
   role = help.checkIsProperRole(role, "registerUser role");

   const hashedPassword = await bcrypt.hash(password, saltRounds);

   const newUser = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: hashedPassword,
      role: role,
   };

   const userCollection = await users();
   const sameEmail = await userCollection
      .find({ emailAddress: emailAddress })
      .toArray();
   if (sameEmail.length > 0) {
      throw `${emailAddress} already has an account associated with it`;
   }

   const newInsertInformation = await userCollection.insertOne(newUser);
   if (!newInsertInformation.insertedId) throw "Error: Insert failed!";

   return { insertedUser: true };
}; 

export const loginUser = async (emailAddress, password) => {
   emailAddress = help.checkIsUndefined(
      emailAddress,
      "loginUser emailAdress"
   );
   password = help.checkIsUndefined(password, "loginUser password");
   const userCollection = await users();

   let sameEmail = await userCollection
      .find({ emailAddress: emailAddress })
      .toArray();
   if (sameEmail.length < 1) {
      throw `Either the email address or password is invalid`;
   }

   sameEmail = sameEmail[0];

   const passwordMatch = await bcrypt.compare(password, sameEmail.password);

   if (!passwordMatch) {
      throw `Either the email address or password is invalid`;
   }

   const returnObj = {
      firstName: sameEmail.firstName,
      lastName: sameEmail.lastName,
      emailAddress: sameEmail.emailAddress,
      role: sameEmail.role,
   };

   return returnObj;
};
