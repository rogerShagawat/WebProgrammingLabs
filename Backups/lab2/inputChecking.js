export const valNameConditional = (valName) => {
   if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   }
   return valName;
};

export const checkIsProperNumber = (val, valName) => {
   valNameConditional(val, valName);
   checkIsUndefined(val);
   if (typeof val !== "number") {
      throw `${valName} is not a number`;
   }
   if (Number.isNaN(val)) {
      throw `${valName} is NaN`;
   }
};

export const checkIsProperString = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   if (typeof val !== "string") {
      throw `${valName} is not a string`;
   }
   if (!val) {
      throw `${valName} is empty`;
   }
};

export const checkIsProperLength = (val, valName, strLength) => {
   valNameConditional(val, valName);
   checkIsProperString(val, valName);
   if (val.length < strLength) {
      throw `${valName} is shorter than 4 characters`;
   }
};

export const checkIsUndefined = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   if (val === undefined) {
      throw `${valName} is undefined`;
   }
};

export const checkIsProperObject = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   if (typeof val !== object || Array.isArray(val)) {
      throw `${valName} is not an object`;
   }
   if (val === null) {
      throw `${valName} is null`;
   }
};

export const checkIsNonEmptyObject = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperArray(val, valName);
   if (Object.keys(obj).length === 0) {
      throw `${valName} is an empty object`;
   }
};

export const checkIsProperArray = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   if (!Array.isArray(val)) {
      throw `${valName} is not an array`;
   }
   if (val === null) {
      throw `${valName} is null`;
   }
};

export const checkIsNonEmptyArray = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperArray(val, valName);
   if (val.length === 0) {
      throw `${valName} is an empty array`;
   }
};

export const checkIsArrayOfLength = (
   val,
   valName = "Provided Variable",
   len
) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperArray(val, valName);
   if (val.length !== len) {
      throw `${valName}'s length is not ${len}`;
   }
};

export const checkIsNumberArray = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperArray(val, valName);
   val.forEach((elem, index) => checkIsProperNumber(elem, index));
};

export const checkIsStringArray = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperArray(val, valName);
   val.forEach((elem, index) => checkIsProperString(elem, index));
};

export const checkKeysConstainedTo = (
   val,
   valName = "Provided Variable",
   validKeys
) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperObject(val, valName);
   let keyNotInValidKeys = false;
   let keys = val.keys();

   keys.forEach((element) => {
      keyNotInValidKeys = validKeys.includes(element) || keyNotInValidKeys;
   });

   if (keyNotInValidKeys) {
      throw `${valName} is not constrained to the valid keys`;
   }
};
