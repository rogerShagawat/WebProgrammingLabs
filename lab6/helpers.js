// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

const valNameConditional = (valName) => {
   if (valName === undefined) {
      return `Provided Variable`;
   } else if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   } else if (typeof valName !== "string") {
      throw `valName not of valid type`;
   }
   return valName;
};

export const checkIsUndefined = (val, valName) => {
   valName = valNameConditional(valName);
   if (val === undefined) {
      throw `${valName} is undefined`;
   }
   return val;
};

const checkIsProperString = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   if (typeof val !== "string") {
      throw `${valName} is not a string`;
   }
   val = val.trim();
   if (!val) {
      throw `${valName} is empty`;
   }
   return val;
};

export const checkIsProperEvent = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);

};
