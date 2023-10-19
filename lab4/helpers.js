//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const states = [
   "AL",
   "AK",
   "AS",
   "AZ",
   "AR",
   "CA",
   "CO",
   "CT",
   "DE",
   "DC",
   "FM",
   "FL",
   "GA",
   "GU",
   "HI",
   "ID",
   "IL",
   "IN",
   "IA",
   "KS",
   "KY",
   "LA",
   "ME",
   "MH",
   "MD",
   "MA",
   "MI",
   "MN",
   "MS",
   "MO",
   "MT",
   "NE",
   "NV",
   "NH",
   "NJ",
   "NM",
   "NY",
   "NC",
   "ND",
   "MP",
   "OH",
   "OK",
   "OR",
   "PW",
   "PA",
   "PR",
   "RI",
   "SC",
   "SD",
   "TN",
   "TX",
   "UT",
   "VT",
   "VI",
   "VA",
   "WA",
   "WV",
   "WI",
   "WY",
];

const valNameConditional = (valName) => {
   if (valName === undefined) {
      return `Provided Variable`;
   }
   if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   }
   return valName;
};

const checkIsUndefined = (val, valName) => {
   valName = valNameConditional(valName);
   if (val === undefined) {
      throw `${valName} is undefined.`;
   }
   return true;
};

const checkIsProperString = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);

   if (typeof val !== "string") {
      throw `${valName} is not a string.`;
   }

   val = val.trim();

   if (!val) {
      throw `${valName} is empty.`;
   }
   return true;
};

const checkIsStrLongEnough = (val, valName, minLength) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperString(val, valName);
   val = val.trim();
   if (val.length < minLength) {
      throw `${valName} less than ${minLength} characters in length`;
   }
   return true;
};

const checkIsValidDate = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperString(val, valName);
   val = val.trim();
   const regex = /^\d{2}\/\d{2}\/\d{4}$/;
   if (!regex.test(val) || isNaN(Date.parse(val))) {
      throw `${valName} is not a valid date of form MM/DD/YYYY`;
   }
   return true;
};

const checkIsProperTimeFormat = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperString(val, valName);
   val = val.trim();
   val = val.toUpperCase();
   const badTimeString = `${valName} not a valid time.`;
   const AMPM = ["AM", "PM"];

   let regex = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/);

   if (regex.test(val) !== true) {
      throw badTimeString;
   }

   let splitVal;
   splitVal = val.split(":");

   if (splitVal.length !== 2) {
      throw badTimeString;
   }

   if (
      !(splitVal[0].length === 2 || splitVal[0].length === 1) ||
      splitVal[1].length !== 4
   ) {
      throw badTimeString;
   }

   let hours = Number(splitVal[0]);

   if (isNaN(hours) || hours > 12 || hours < 1) {
      throw badTimeString;
   }

   let minutes = Number(splitVal[1].substring(0, 2));

   if (isNaN(minutes) || minutes > 59 || minutes < 0) {
      throw badTimeString;
   }

   let amPm = splitVal[1].substring(2);

   if (!AMPM.includes(amPm)) {
      throw badTimeString;
   }
   return true;
};

const convertTo24HourTime = (timeStr) => {
   checkIsUndefined(timeStr);
   checkIsProperTimeFormat(timeStr);
   timeStr = timeStr.trim().toUpperCase();
   const meridiem = timeStr.substring(timeStr.length - 2);
   let [hours, minutes] = timeStr.substring(0, timeStr.length - 2).split(":");
   if (hours === "12") {
      hours = "00";
   }
   if (meridiem === "PM") {
      hours = parseInt(hours, 10) + 12;
   }
   return `${hours}:${minutes}`;
};

const timeToNum = (timeStr) => {
   checkIsProperTimeFormat(timeStr);

   let result;
   const timeArr = timeStr.split(":");
   let hours = timeArr[0];
   let minutes = timeArr[1].substring(0, 2);
   let meridiem = timeArr[1].substring(2);

   hours = Number(hours);
   minutes = Number(minutes);

   hours = hours * 60;
   result = hours + minutes;

   meridiem.toUpperCase();

   if (meridiem === "AM") {
      return result;
   } else if (meridiem === "PM") {
      return result + 12 * 60;
   }
};

const checkIsProperBoolean = (val, valName) => {
   valName = valNameConditional(valName);

   if (typeof val !== "boolean") {
      throw `${valName} not a boolean`;
   }
};

const checkIsProperNumber = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   if (typeof val !== "number") {
      throw `${valName} is not a number.`;
   }
   if (Number.isNaN(val)) {
      throw `${valName} is NaN.`;
   }
};

const checkIsProperObject = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   if (typeof val !== "object" || Array.isArray(val)) {
      throw `${valName} is not an object`;
   }
   if (val === null) {
      throw `${valName} is null`;
   }
};

const checkObjectHasKeys = (val, valName, keyArr) => {
   valName = valNameConditional(valName);
   checkIsProperObject(val);
   keyArr.forEach((key) => {
      if (!val.hasOwnProperty(key)) {
         throw `${valName} does not have ${key}`;
      }
   });
};

const checkObjectValsAllOfType = (val, valName, typeStr) => {
   valName = valNameConditional(valName);
   checkIsProperObject(val);
   const valKeys = Object.keys(val);
   if (typeStr === "string") {
      valKeys.forEach((key) => checkIsProperString(val[key]));
   } else if (typeStr === "number") {
      valKeys.forEach((key) => checkIsProperNumber(val[key]));
   } else if (typeStr === "boolean") {
      valKeys.forEach((key) => checkIsProperBoolean(val[key]));
   }
};

const countDecimals = (num) => {
   if (Number.isInteger(num)) return 0;
   return num.toString().split(".")[1].length;
}

export {
   states,
   checkIsUndefined,
   checkIsProperString,
   checkIsStrLongEnough,
   checkIsValidDate,
   checkIsProperTimeFormat,
   timeToNum,
   checkIsProperBoolean,
   checkIsProperNumber,
   checkIsProperObject,
   checkObjectHasKeys,
   convertTo24HourTime,
   countDecimals,
};
