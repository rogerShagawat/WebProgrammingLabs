/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
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
   if (typeof val !== "object" || Array.isArray(val)) {
      throw `${valName} is not an object`;
   }
   if (val === null) {
      throw `${valName} is null`;
   }
};

export const checkIsNonEmptyObject = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperObject(val, valName);
   if (Object.keys(val).length === 0) {
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

// export const checkKeysConstainedTo = (
//    val,
//    valName = "Provided Variable",
//    validKeys
// ) => {
//    valName = valNameConditional(valName);
//    checkIsUndefined(val, valName);
//    checkIsProperObject(val, valName);
//    let keys = Object.keys(val);

//    let areKeysValid = keys.reduce((acc, key) => {
//       const isValid = validKeys.includes(key);
//       console.log(isValid);
//       return acc && isValid;
//    }, true);

//    if (!areKeysValid) {
//       throw `${valName} is not constrained to the valid keys`;
//    }
// };

export const checkArrayIsConstrainedTo = (arr, valName, validArray) => {
   valName = valNameConditional(valName);
   checkIsUndefined(arr, valName);
   checkIsProperArray(arr, valName);

   let isArrValid = arr.reduce((acc, elem) => {
      const isValid = validArray.includes(elem);
      return acc && isValid;
   }, true);

   if (!isArrValid) {
      throw `${valName} is not constrained to the valid array`;
   }
};

export let keysFromVal = (obj, val) => {
   let result = [];
   const keys = Object.keys(obj);
   for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      if (obj[key] === val) {
         result.push(key);
      }
   }
   return result;
};

export let maxKeyValueInObject = (obj) => {
   const vals = Object.values(obj);
   const maxVal = Math.max(...vals);
   const keys = keysFromVal(obj, maxVal);
   return [keys, maxVal];
};

export let minKeyValueInObject = (obj) => {
   const vals = Object.values(obj);
   const minVal = Math.min(...vals);
   const keys = keysFromVal(obj, minVal);
   return [keys, minVal];
};

export const checkIsArrayLongerThanTwo = (
   val,
   valName = "Provided Variable"
) => {
   valName = valNameConditional(valName);
   checkIsNonEmptyArray(val, valName);
   if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   }
   if (val.length < 2) {
      throw `${valName} is shorter than two`;
   }
};

export const checkIsArrayNumArrayOrString = (
   val,
   valName = "Provided Variable"
) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val);
   if (typeof val === "number") {
      checkIsProperNumber(val, valName);
   } else if (typeof val === "string") {
      checkIsProperString(val, valName);
   } else if (typeof val === "object") {
      checkIsNonEmptyArray(val, valName);
      val.forEach((elem) => {
         checkIsUndefined(val);
         if (typeof val === "number") {
            checkIsProperNumber(val, valName);
         } else if (typeof val === "string") {
            checkIsProperString(val, valName);
         }
      });
   }
};

export const checkIs2dArray = (val, variableName) => {
   if (!Array.isArray(val)) {
      throw `${variableName || "Provided Variable"} is not an array`;
   }
   if (val.length === 0) {
      throw `${variableName || "Provided Variable"} is an empty array`;
   }
   val.forEach(checkIsValidTriangle);
};

export const checkIsValidTriangle = (val, valIndex) => {
   valIndex = valNameConditional(valIndex);
   if (!Array.isArray(val)) {
      throw `${valIndex} is not an array`;
   }
   if (val.length !== 3) {
      throw `${valIndex} does not have 3 valid numbers`;
   }

   try {
      val.forEach((elem) => checkIsProperNumber(elem));
   } catch (e) {
      throw `${valIndex} does not contain valid numbers: ${e}`;
   }

   const numSort = (num1, num2) => num1 - num2;
   val.sort(numSort);

   if (!(val[0] + val[1] > val[2])) {
      throw `${valIndex} is not a valid triangle`;
   }
};

export const checkIsValidTicker = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsProperString(val);

   const alphabetLength = val.match(/[qwertyuiopasdfghjklzxcvbnm]/gi).length;
   if (val.length !== alphabetLength) {
      throw `${valName} is not constrained to a-z`;
   }
   if (val.length > 5 || val.length < 1) {
      throw `${valName} not within 1-5 characters`;
   }
};
