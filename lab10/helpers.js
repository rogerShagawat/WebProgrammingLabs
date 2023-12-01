//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import * as EmailValidator from "email-validator";

const valNameConditional = (valName) => {
   if (!valName) {
      return `Provided Variable`;
   } else if (typeof valName !== "string") {
      throw `valName ${JSON.stringify(valName)} not of valid type`;
   }
   return valName;
};

const exportedMethods = {
   checkIsUndefined(val, valName) {
      valName = valNameConditional(valName);
      if (val === undefined) {
         throw `${valName} is undefined`;
      }
      return val;
   },
   checkIsProperString(val, valName) {
      valName = valNameConditional(valName);
      val = this.checkIsUndefined(val, valName);
      if (typeof val !== "string") throw `${valName} is not a string`;
      val = val.trim();
      if (!val) throw `${valName} is empty or whitespace`;
      return val;
   },

   checkIsProperEmail(val, valName) {
      valName = valNameConditional(valName);
      val = this.checkIsProperString(val, valName);
      val = val.toLowerCase();
      if (!EmailValidator.validate(val)) {
         throw `${valName} is an invalid Email`;
      }

      return val;
   },

   checkIsProperName(val, valName, minChars = 2, maxChars = 25) {
      valName = valNameConditional(valName);
      val = this.checkIsProperString(val, valName);
      if (val.length < minChars || val.length > maxChars) {
         throw `${valName} must be between ${minChars} and ${maxChars} characters long`;
      }
      return val;
   },

   checkIsProperPassword(val, valName) {
      valName = valNameConditional(valName);
      val = this.checkIsProperString(val, valName);

      if (val.length < 8) {
         throw `${valName} must be 8 characters or longer`;
      }

      const whiteSpaceRE = /\s/;
      if (whiteSpaceRE.test(val)) {
         throw `${valName} must not contain whitespace`;
      }  

      const upperCaseRE = /[A-Z]/;
      if (!upperCaseRE.test(val)) {
         throw `${valName} must contain at least one upper case character`;
      }

      const numberRE = /[0-9]/;
      if (!numberRE.test(val)) {
         throw `${valName} must contain at least one number`;
      }

      const specialCharsRE = /[^a-zA-Z0-9]/;
      if (!specialCharsRE.test(val)) {
         throw `${valName} must contain at least one special character`;
      }

      return val;
   },

   checkIsProperRole(val, valName) {
      const validRoles = ["admin", "user"];
      valName = valNameConditional(valName);
      val = this.checkIsProperString(val, valName);
      val = val.trim().toLowerCase();
      if (!validRoles.includes(val)) {
         throw `${valName} must be either "admin" or "user"`;
      }
      return val;
   },
};

export default exportedMethods;
