// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { eventData } from "./data/index.js";
import { events } from "./config/mongoCollections.js";
import * as EmailValidator from "email-validator";
import { ObjectId } from "mongodb";

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
   } else if (typeof valName === "number") {
      valName = `Value at position ${valName}`;
   } else if (typeof valName !== "string") {
      throw `valName ${JSON.stringify(valName)} not of valid type`;
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

export const checkIsProperString = (val, valName) => {
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

const checkIsProperObject = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   if (typeof val !== "object" || Array.isArray(val)) {
      throw `${valName} is not an object`;
   }
   if (val === null) {
      throw `${valName} is null`;
   }
   if (Object.keys(val).length === 0) {
      throw `${valName} is an empty Object`;
   }
   return val;
};

const validEventKeys = [
   "eventName",
   "description",
   "eventLocation",
   "contactEmail",
   "maxCapacity",
   "priceOfAdmission",
   "eventDate",
   "startTime",
   "endTime",
   "publicEvent",
   "attendees",
   "totalNumberOfAttendees",
];

const checkIsValidDate = (val, valName) => {
   valName = valNameConditional(valName);
   checkIsUndefined(val, valName);
   checkIsProperString(val, valName);
   val = val.trim();
   const regex = /^\d{2}\/\d{2}\/\d{4}$/;
   if (!regex.test(val) || isNaN(Date.parse(val)))
      throw `${valName} is not a valid date of form MM/DD/YYYY`;

   return val;
};

const checkIsProperTimeFormat = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   val = checkIsProperString(val, valName);
   val = val.trim();
   val = val.toUpperCase();
   const badTimeString = `${valName} not a valid time.`;
   const AMPM = ["AM", "PM"];

   let regex = new RegExp(/((1[1-2]|0?[1-9]):([0-5][0-9])\s?([AP][M]))/);
   if (regex.test(val) !== true) throw badTimeString;

   let splitVal;
   splitVal = val.split(":");
   if (splitVal.length !== 2) throw badTimeString;
   if (
      !(splitVal[0].length === 2 || splitVal[0].length === 1) ||
      splitVal[1].length !== 5
   ) {
      throw badTimeString;
   }

   if (splitVal[0].charAt(0).match("0")) throw badTimeString;

   let hours = Number(splitVal[0]);

   if (isNaN(hours) || hours > 12 || hours < 1) throw badTimeString;

   let minutes = Number(splitVal[1].substring(0, 2));

   if (isNaN(minutes) || minutes > 59 || minutes < 0) throw badTimeString;

   let amPm = splitVal[1].substring(2).trim();

   if (!AMPM.includes(amPm)) throw badTimeString;

   return val;
};

const convertTo24HourTime = (timeStr) => {
   checkIsUndefined(timeStr);
   checkIsProperTimeFormat(timeStr);
   timeStr = timeStr.trim().toUpperCase();
   const meridiem = timeStr.substring(timeStr.length - 2);
   let [hours, minutes] = timeStr.substring(0, timeStr.length - 3).split(":");
   if (hours === "12") {
      hours = "00";
   }
   if (meridiem === "PM") {
      hours = parseInt(hours, 10) + 12;
   }
   return `${hours}:${minutes}`;
};

const checkIsProperBoolean = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   if (typeof val !== "boolean") throw `${valName} not a boolean`;
   return val;
};

const checkIsProperNumber = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   if (typeof val !== "number") throw `${valName} is not a number.`;
   if (Number.isNaN(val)) throw `${valName} is NaN.`;

   return val;
};

export const checkIsProperArray = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   if (!Array.isArray(val)) throw `${valName} is not an array`;
   if (val === null) throw `${valName} is null`;

   return val;
};

const countDecimals = (num) => {
   if (Number.isInteger(num)) return 0;
   return num.toString().split(".")[1].length;
};

export const checkAndFixEventObject = (val, valName) => {
   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   val = checkIsProperObject(val, valName);
   const valKeys = Object.keys(val);
   valKeys.forEach((key) => checkIsUndefined(val[key]));

   val = checkObjectHasKeys(val, valName, validEventKeys);

   if (validEventKeys.length !== Object.keys(val).length)
      throw `${valName} does not have the correct keys`;

   // this trims the string vals
   val.eventName = checkIsProperString(
      val.eventName,
      `eventName in ${valName}`
   );
   val.description = checkIsProperString(
      val.description,
      `description in ${valName}`
   );
   val.contactEmail = checkIsProperString(
      val.contactEmail,
      `contactEmail in ${valName}`
   );
   val.eventDate = checkIsProperString(
      val.eventDate,
      `eventDate in ${valName}`
   );
   val.startTime = checkIsProperString(
      val.startTime,
      `startTime in ${valName}`
   );
   val.endTime = checkIsProperString(val.endTime, `endTime in ${valName}`);

   if (val.eventName.length < 5)
      throw `eventName like way too long maybe in ${valName}`;
   if (val.description.length < 25)
      throw `description like way too long maybe in ${valName}`;
   if (!EmailValidator.validate(val.contactEmail))
      throw `contactEmail malformed`;

   checkIsValidDate(val.eventDate);
   const curDate = new Date();
   if (curDate > Date.parse(val.eventDate)) throw `eventDate is in the future.`;

   checkIsProperTimeFormat(val.startTime, `startTime in ${valName}`);
   checkIsProperTimeFormat(val.endTime, `endTime in ${valName}`);

   const startTime24Hour = convertTo24HourTime(val.startTime);
   const endTime24Hour = convertTo24HourTime(val.endTime);
   const startTimeDate = Date.parse(`09/25/2000 ${startTime24Hour}`);
   const endTimeDate = Date.parse(`09/25/2000 ${endTime24Hour}`);
   if (startTimeDate > endTimeDate - 30 * 60000)
      throw `endTime must be 30 minutes or more after startTime`;

   checkIsProperBoolean(val.publicEvent, `publicEvent in ${valName}`);
   checkIsProperNumber(val.maxCapacity, `maxCapacity in ${valName}`);
   checkIsProperNumber(val.priceOfAdmission, `priceOfAdmission in ${valName}`);
   if (val.maxCapacity < 1 || !Number.isInteger(val.maxCapacity))
      throw `maxCapacity not a positive whole number`;
   if (val.priceOfAdmission < 0 || countDecimals(val.priceOfAdmission) > 2)
      throw `priceOfAdmission not a positive number with 2 decimal places or fewer, or 0`;

   val.eventLocation = checkIsProperEventLocation(
      val.eventLocation,
      `eventLocation in ${valName}`
   );

   val.attendees = checkIsProperArray(val.attendees, `attendees in ${valName}`);
   val.totalNumberOfAttendees = checkIsProperNumber(
      val.totalNumberOfAttendees,
      `totalNumberOfAttendees in ${valName}`
   );
   if (val.totalNumberOfAttendees < 0)
      throw `totalNumberOfAttendees in ${valName} less than 0`;

   return val;
};

const checkObjectHasKeys = (val, valName, keyArr) => {
   valName = valNameConditional(valName);
   val = checkIsProperObject(val, valName);
   keyArr.forEach((key) => {
      if (!val.hasOwnProperty(key)) {
         throw `${valName} does not have ${key}`;
      }
   });
   return val;
};

const checkIsProperEventLocation = (val, valName) => {
   const eventLocationKeys = ["streetAddress", "city", "state", "zip"];

   valName = valNameConditional(valName);
   val = checkIsUndefined(val, valName);
   val = checkIsProperObject(val, valName);
   val = checkObjectHasKeys(val, valName, eventLocationKeys);
   if (eventLocationKeys.length !== Object.keys(val).length)
      throw `${valName} does not have the correct keys`;
   eventLocationKeys.forEach((key) => {
      val[key] = checkIsProperString(val[key]);
   });
   if (val["streetAddress"].trim().length < 3)
      throw `${valName} streetAddress shorter than 3 characters`;
   if (val["city"].trim().length < 3)
      throw `${valName} city shorter than 3 characters`;
   if (!states.includes(val["state"].trim()))
      throw `${valName} state not a valid state`;
   if (val["zip"].trim().length !== 5 || isNaN(Number(val["zip"].trim())))
      throw `eventLocation.zip not a valid zip`;

   return val;
};

export const checkIsProperId = (id, valName) => {
   valName = valNameConditional(valName);
   id = checkIsUndefined(id, valName);
   id = checkIsProperString(id, valName);
   id = id.trim();
   if (!ObjectId.isValid(id)) throw `${valName} is invalid id`;
   return id;
};

export const checkIsProperEventId = async (eventId, valName) => {
   valName = valNameConditional(valName);
   eventId = checkIsProperString(eventId, valName);
   if (!ObjectId.isValid(eventId)) throw `${valName} is invalid eventId`;
   const event = await eventData.get(eventId);
   if (!event) throw `no event associated with ${eventId} exists`;
   return eventId;
};

export const checkAndFixAttendees = async (eventId, val, valName) => {
   const validAttendeeKeys = ["_id", "firstName", "lastName", "emailAddress"];

   await checkIsProperEventId(eventId, `${valName} event id`);

   valName = valNameConditional(valName);
   val = checkIsProperObject(val, valName);
   val = checkObjectHasKeys(val, valName, validAttendeeKeys);
   if (validAttendeeKeys.length !== Object.keys(val).length)
      throw `${valName} does not have the correct keys`;

   if (!ObjectId.isValid(val._id)) throw `${valName} has invalid id`;
   val.firstName = checkIsProperString(val.firstName);
   val.lastName = checkIsProperString(val.lastName);
   val.emailAddress = checkIsProperString(val.emailAddress);

   // check if eventId actually exists in the db

   if (!EmailValidator.validate(val.emailAddress))
      throw `${val.emailAddress} emailAddress malformed`;

   // check if email exists in attendees for this event
   const event = await eventData.get(eventId);

   const emailsMatched = event.attendees.filter(
      (attendee) => !attendee.emailAddress.localeCompare(val.emailAddress)
   );

   if (emailsMatched.length > 0)
      throw `${val.emailAddress} already in event ${event.eventName}`;

   // check if attendees is already full
   if (event.totalNumberOfAttendees + 1 > event.maxCapacity)
      throw `cannot add attendee ${event.eventName} at max capacity of ${event.maxCapacity}`;

   return val;
};

export const checkIsProperEventPost = (val, valName) => {
   val = checkIsProperObject(val, valName);
   const validKeys = [
      "eventName",
      "description",
      "eventLocation",
      "contactEmail",
      "maxCapacity",
      "priceOfAdmission",
      "eventDate",
      "startTime",
      "endTime",
      "publicEvent",
   ];

   const keysFromVal = Object.keys(val);
   if (validKeys.length !== keysFromVal.length)
      throw `${valName} has malformed body`;

   checkObjectHasKeys(val, valName, validKeys);
   return val;
};

export const checkIsProperEventPut = (val, valName) => {
   return checkIsProperEventPost(val, valName);
};

export const checkIsProperAttendeePost = (val, valName) => {
   const validKeys = ["firstName", "lastName", "emailAddress"];

   val = checkIsProperObject(val, valName);

   const keysFromVal = Object.keys(val);
   if (validKeys.length !== keysFromVal.length)
      throw `${valName} has malformed body`;

   checkObjectHasKeys(val, valName, validKeys);

   return val;
};


export const checkIsProperAttendeePut = (val, valName) => {
   return checkIsProperAttendeePost(val, valName);
};