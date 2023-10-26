import { events } from "../config/mongoCollections.js";

// This data file should export all functions using the ES6 standard as shown in the lecture code

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
   //Implement Code here
   //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation

   // TODO input checking create

   let newEvent = {};
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

   const eventCollection = await events();
   const insertInfo = await eventCollection.insertOne(newEvent);
   if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not add event";
   const newId = insertInfo.insertedId.toString();

   const event = await get(newId);
   return event;
};

const getAll = async () => {
   const eventCollection = await events();
   const eventList = await eventCollection.find({}).toArray();
   return eventList;
};

const get = async (eventId) => {
   // TODO input checking get
   //Implement Code here
   const eventCollection = await events();
   const event = await eventCollection.findOne({ _id: eventId });

   if (!event) {
      throw `Could not find event with id of ${id}`;
   }
   return event;
};

const remove = async (eventId) => {
   //Implement Code here
   // TODO error checking remove

   const eventCollection = await events();
   const deleted = await eventCollection.findOneAndDelete({
      _id: eventId,
   });

   if (!deleted) {
      throw `Could not find event with id of ${id}`;
   }
   if (deleted.lastErrorObject.n === 0) {
      throw `Could not delete event with id of ${id}`;
   }
   const resultObj = { eventName: deletionInfo.value.eventName, deleted: true };
   return resultObj;
};

const update = async (
   eventId,
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
   //Implement Code here
   // TODO input checking
   // TODO error checking
   const eventCollection = await events();
   let event = await get(id);

   let updatedEvent = {};
   updatedEvent["eventName"] = eventName;
   updatedEvent["description"] = eventDescription;
   updatedEvent["eventLocation"] = eventLocation;
   updatedEvent["contactEmail"] = contactEmail;
   updatedEvent["maxCapacity"] = maxCapacity;
   updatedEvent["priceOfAdmission"] = priceOfAdmission;
   updatedEvent["eventDate"] = eventDate;
   updatedEvent["startTime"] = startTime.toUpperCase();
   updatedEvent["endTime"] = endTime.toUpperCase();
   updatedEvent["publicEvent"] = publicEvent;

   await eventCollection.findOneAndUpdate(
      { _id: eventId },
      { $set: updatedEvent },
      { returnDocument: "after" }
   );
   return await get(id);
};
