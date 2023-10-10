/* Roger Shagawat 10441828 I pledge my honor that I have abided by the Stevens Honor System. */

//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from "axios";

async function getAuthors() {
   const { data } = await axios.get(
      "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
   );
   if (data.length < 1) {
      throw `data is empty in getAuthors`
   }
   return data; // this will be the array of author objects
}

async function getBooks() {
   const { data } = await axios.get(
      "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
   );
   if (data.length < 1) {
      throw `data is empty in getBooks`
   }
   return data; // this will be the array of author objects
}

const sortByObjectField = (arr, field) => {
   const compareObj = (objA, objB) => {
      const fieldA = objA[field];
      const fieldB = objB[field];
      if (fieldA < fieldB) {
         return -1;
      }
      if (fieldA > fieldB) {
         return 1;
      }
   };

   return arr.sort(compareObj);
};

const valNameConditional = (valName) => {
   if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   }
   return valName;
};

const checkIsUndefined = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   if (val === undefined) {
      throw `${valName} is undefined.`;
   }
};

const checkIsProperString = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);

   if (typeof val !== "string") {
      throw `${valName} is not a string.`;
   }

   val = val.trim();

   if (!val) {
      throw `${valName} is empty.`;
   }
};

const checkIsProperNumber = (val, valName = "Provided Variable") => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);

   if (typeof val !== "number") {
      throw `${valName} is not a number.`;
   }

   if (Number.isNaN(val)) {
      throw `${valName} is NaN.`;
   }
};

const checkIsProperMonthDay = (month, day, valNames = ["Month", "Day"]) => {
   const monthName = valNames[0];
   const dayName = valNames[1];

   checkIsProperNumber(month, monthName);
   checkIsProperNumber(day, dayName);

   if (month < 1 || month > 12) {
      throw `${monthName} not a valid month. (between 1 and 12)`;
   }

   const daysInMonth = Number(new Date(2024, month, 0).getDate());

   if (day < 1 || day > daysInMonth) {
      throw `${dayName} not a valid day in month selected. (between 1 and ${daysInMonth})`;
   }
};

export {
   getAuthors,
   getBooks,
   sortByObjectField,
   checkIsUndefined,
   checkIsProperString,
   checkIsProperNumber,
   checkIsProperMonthDay,
};
