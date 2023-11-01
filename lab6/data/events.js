import { events } from "../config/mongoCollections.js";
import * as help from "../helpers.js";
import { ObjectId } from "mongodb";

// This data file should export all functions using the ES6 standard as shown in the lecture code

const exportedMethods = {
   async get(eventId) {
      //Implement Code here
      eventId = help.checkIsUndefined(eventId, "eventId");
      eventId = help.checkIsProperString(eventId, "eventId");
      eventId = eventId.trim();
      if (!ObjectId.isValid(eventId)) throw `invalid object ID`;
      const eventCollection = await events();
      const event = await eventCollection.findOne({
         _id: new ObjectId(eventId),
      });
      if (!event) {
         throw `Could not find event with id of ${eventId}`;
      }
      return event;
   },

   async create(
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
   ) {
      //Implement Code here
      //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation

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

      params.forEach((param) => help.checkIsUndefined(param));

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
      newEvent["attendees"] = [];
      newEvent["totalNumberOfAttendees"] = 0;

      newEvent = help.checkAndFixEventObject(newEvent, "New event");

      const eventCollection = await events();
      const insertInfo = await eventCollection.insertOne(newEvent);
      if (!insertInfo.acknowledged || !insertInfo.insertedId)
         throw "Could not add event";
      const newId = insertInfo.insertedId.toString();

      const event = await this.get(newId);
      return event;
   },

   async getAll() {
      const eventCollection = await events();
      const eventList = await eventCollection
         .find({}, { projection: { _id: 1, eventName: 1 } })
         .toArray();
      return eventList;
   },

   async remove(eventId) {
      //Implement Code here
      eventId = help.checkIsUndefined(eventId, "eventId");
      eventId = help.checkIsProperString(eventId, "eventId");
      eventId = eventId.trim();
      if (!ObjectId.isValid(eventId)) throw "invalid object ID";

      const eventCollection = await events();
      const deleted = await eventCollection.findOneAndDelete({
         _id: new ObjectId(eventId),
      });

      if (!deleted) {
         throw `Could not find event with id of ${eventId}`;
      }

      const resultObj = {
         eventName: deleted.eventName,
         deleted: true,
      };

      return resultObj;
   },

   async update(
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
   ) {
      //Implement Code here
      // TODO input checking
      // TODO error checking
      const eventCollection = await events();
      let event = await this.get(eventId);

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
      updatedEvent["attendees"] = event.attendees;
      updatedEvent["totalNumberOfAttendees"] = event.totalNumberOfAttendees;

      updatedEvent = help.checkAndFixEventObject(updatedEvent, `Updated Event`);

      const found = await eventCollection.findOneAndUpdate(
         { _id: new ObjectId(eventId) },
         { $set: updatedEvent },
         { returnDocument: "after" }
      );

      if (!found) throw `no event with id ${eventId}`;

      return await this.get(eventId);
   },
};

export default exportedMethods;
