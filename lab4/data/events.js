// TODO: Export and implement the following functions in ES6 format

import * as help from "../helpers.js";
import * as EmailValidator from "email-validator";
import { events } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const create = async (
   eventName,
   eventDescription,
   eventLocation,
   contactEmail,
   maxCapacity,
   priceOfAdmission,
   eventDate,
   startTime,
   endTime,
   publicEvent
) => {
   let newEvent = {};
   const params = [
      eventName,
      eventDescription,
      eventLocation,
      contactEmail,
      maxCapacity,
      priceOfAdmission,
      eventDate,
      startTime,
      endTime,
      publicEvent,
   ];
   let strParams = [
      eventName,
      eventDescription,
      contactEmail,
      eventDate,
      startTime,
      endTime,
   ];
   params.forEach((param) => help.checkIsUndefined(param));

   // trimming all the string params
   strParams = strParams.map((param) => param.trim());
   [eventName, eventDescription, contactEmail, eventDate, startTime, endTime] =
      strParams;

   strParams.forEach((param) => help.checkIsProperString(param));
   help.checkIsStrLongEnough(eventName, "eventName", 5);
   help.checkIsStrLongEnough(eventDescription, "eventDescription", 25);
   if (!EmailValidator.validate(contactEmail))
      throw `Invalid email supplied for ${contactEmail}`;

   help.checkIsValidDate(eventDate);
   const curDate = new Date();
   if (curDate > Date.parse(eventDate)) throw `eventDate is in the future.`;

   help.checkIsProperTimeFormat(startTime, "startTime");
   help.checkIsProperTimeFormat(endTime, "endTime");

   // const startTimeNum = help.timeToNum(startTime);
   // const endTimeNum = help.timeToNum(endTime);
   // console.log(startTimeNum);
   // console.log(endTimeNum);
   // if (startTimeNum > endTimeNum - 30)
   //    throw `endTime must be 30 minutes after endTime`;
   const startTime24Hour = help.convertTo24HourTime(startTime);
   const endTime24Hour = help.convertTo24HourTime(endTime);
   const startTimeDate = Date.parse(`09/25/2000 ${startTime24Hour}`);
   const endTimeDate = Date.parse(`09/25/2000 ${endTime24Hour}`);
   if (startTimeDate > endTimeDate - 30 * 60000)
      throw `endTime must be 30 minutes or more after startTime`;

   // console.log(startTime24Hour);
   // console.log(endTime24Hour);

   // console.log(startTimeDate);
   // console.log(endTimeDate);

   help.checkIsProperBoolean(publicEvent);
   help.checkIsProperNumber(maxCapacity);
   help.checkIsProperNumber(priceOfAdmission);
   if (maxCapacity < 1 || !Number.isInteger(maxCapacity))
      throw `maxCapacity not a positive whole number`;

   if (priceOfAdmission < 0 || help.countDecimals(priceOfAdmission) > 2)
      throw `priceOfAdmission not a positive number with 2 decimal places or fewer, or 0`;

   const eventLocationKeys = ["streetAddress", "city", "state", "zip"];
   help.checkIsProperObject(eventLocation, "eventLocation");
   help.checkObjectHasKeys(eventLocation, "eventLocation", eventLocationKeys);
   eventLocationKeys.forEach((key) =>
      help.checkIsProperString(eventLocation[key])
   );
   if (eventLocation["streetAddress"].trim().length < 3)
      throw `eventLocation.streetAddress shorter than 3 characters`;

   if (eventLocation["city"].trim().length < 3)
      throw `eventLocation.city shorter than 3 characters`;

   const states = help.states;

   if (!states.includes(eventLocation["state"].trim()))
      throw `eventLocation.state not a valid state`;

   if (
      eventLocation["zip"].trim().length !== 5 ||
      isNaN(Number(eventLocation["zip"].trim()))
   ) {
      throw `eventLocation.zip not a valid zip`;
   }

   newEvent["eventName"] = eventName;
   newEvent["description"] = eventDescription;
   newEvent["eventLocation"] = eventLocation;
   newEvent["contactEmail"] = contactEmail;
   newEvent["maxCapacity"] = maxCapacity;
   newEvent["priceOfAdmission"] = priceOfAdmission;
   newEvent["eventDate"] = eventDate;
   newEvent["startTime"] = startTime.toUpperCase();
   newEvent["endTime"] = endTime.toUpperCase();
   newEvent["publicEvent"] = publicEvent;

   //send the event to mongo db :)
   const eventCollection = await events();
   const insertInfo = await eventCollection.insertOne(newEvent);
   if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add event";
   const newId = insertInfo.insertedId.toString();

   // TODO UNCOMMENT WHEN GET IS MADE
   const event = await get(newId);
   return event;
};

const getAll = async () => {
   const eventCollection = await events();
   let eventList = await eventCollection.find({}).toArray();
   if (!eventList) throw "Could not get all events";
   eventList = eventList.map((element) => {
      element._id = element._id.toString();
      return element;
   });
   return eventList;
};

const get = async (id) => {
   help.checkIsProperString(id, "Id");
   id = id.trim();
   if (!ObjectId.isValid(id)) throw "invalid object ID";
   const eventCollection = await events();
   const evento = await eventCollection.findOne({ _id: new ObjectId(id) });
   if (evento === null) throw "No event with given id";
   evento._id = evento._id.toString();
   return evento;
};

const remove = async (id) => {
   help.checkIsProperString(id, "Id");
   id = id.trim();
   if (!ObjectId.isValid(id)) throw "invalid object ID";

   const eventCollection = await events();
   const deletionInfo = await eventCollection.findOneAndDelete({
      _id: new ObjectId(id),
   });

   if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete event with id of ${id}`;
   }
   const resultObj = { eventName: deletionInfo.value.eventName, deleted: true };
   return resultObj;
};

const rename = async (id, newEventName) => {
   help.checkIsUndefined(id, "Id");
   help.checkIsUndefined(newEventName, "newEventName");
   help.checkIsProperString(id, "Id");
   help.checkIsProperString(newEventName, "newEventName");
   id = id.trim();
   newEventName = newEventName.trim();
   if (newEventName.length < 5) {
      throw `newEventName shorter than 5 characters`;
   }
   if (!ObjectId.isValid(id)) throw "invalid object ID";

   let event = await get(id);
   let updatedEvent = {};
   updatedEvent["eventName"] = newEventName;
   updatedEvent["description"] = event.description;
   updatedEvent["eventLocation"] = event.eventLocation;
   updatedEvent["contactEmail"] = event.contactEmail;
   updatedEvent["maxCapacity"] = event.maxCapacity;
   updatedEvent["priceOfAdmission"] = event.priceOfAdmission;
   updatedEvent["eventDate"] = event.eventDate;
   updatedEvent["startTime"] = event.startTime;
   updatedEvent["endTime"] = event.endTime;
   updatedEvent["publicEvent"] = event.publicEvent;
   const eventCollection = await events();
   const updatedInfo = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedEvent },
      { returnDocument: "after" }
   );
   if (updatedInfo.lastErrorObject.n === 0) {
      throw "could not update event successfully";
   }
   updatedInfo.value._id = updatedInfo.value._id.toString();
   return updatedInfo.value;
};

export { create, getAll, get, remove, rename };
