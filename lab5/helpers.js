//You can add and export any helper functions you want here. If you aren't using
//any, then you can just leave this file as is.

export const valNameConditional = (valName) => {
   if (valName === undefined) return `Provided Variable`;
   if (typeof valName === "number") valName = `Value at position ${valName}`;
   return valName;
};

export const checkIsUndefined = (val, valName) => {
   valName = valNameConditional(valName);
   if (val === undefined) throw `${valName} is undefined.`;
   return val;
};

export const checkIsProperString = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);

   if (typeof val !== "string") throw `${valName} is not a string.`;
   val = val.trim();
   if (!val) throw `${valName} is empty.`;
   return val;
};

export const checkIsProperId = (id) => {
   checkIsUndefined(id, "ID");
   checkIsProperString(id, "ID");
   id = id.trim();
   return id;
};

export const checkIsProperObject = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   if (typeof val !== "object" || Array.isArray(val))
      throw `${valName} is not an object`;
   if (val === null) throw `${valName} is null`;
   if (Object.keys(val).length === 0) throw `${valName} is empty`;
};
