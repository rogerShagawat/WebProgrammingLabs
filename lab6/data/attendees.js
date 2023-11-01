// This data file should export all functions using the ES6 standard as shown in the lecture code

import { events } from "../config/mongoCollections.js";
import * as help from "../helpers.js";
// import { eventData } from "./index.js";
import { ObjectId } from "mongodb";
import { eventData } from "./index.js";

/*
{ 
  _id: ObjectId,
  firstName: string,
  lastName: string,
  emailAddress: string,
}
*/

let exportedMethods = {
   async createAttendee(eventId, firstName, lastName, emailAddress) {
      //Implement Code here

      eventId = eventId.trim();
      eventId = await help.checkIsProperEventId(eventId);

      let newAttendee = {};
      newAttendee["_id"] = new ObjectId();
      newAttendee["firstName"] = firstName;
      newAttendee["lastName"] = lastName;
      newAttendee["emailAddress"] = emailAddress;
      newAttendee = await help.checkAndFixAttendees(
         eventId,
         newAttendee,
         "attendee"
      );

      const eventCollection = await events();
      await eventCollection.updateOne(
         { _id: new ObjectId(eventId) },
         {
            $push: { attendees: newAttendee },
            $inc: { totalNumberOfAttendees: 1 },
         }
      );

      return newAttendee;
   },

   async getAllAttendees(eventId) {
      //Implement Code here
      eventId = await help.checkIsProperEventId(eventId, "event id");
      eventId = eventId.trim();

      const event = await eventData.get(eventId);
      return event.attendees;
   },

   async getAttendee(attendeeId) {
      //Implement Code here
      // input checking
      attendeeId = help.checkIsProperString(attendeeId);
      if (!ObjectId.isValid(attendeeId)) throw `attendee id is invalid`;

      const objectifiedAttendeeId = new ObjectId(attendeeId);
      const eventCollection = await events();
      const found = await eventCollection.findOne({
         "attendees._id": { $eq: objectifiedAttendeeId },
      });

      if (!found) throw `${attendeeId} not an id of any attendees`;

      const foundAttendee = found.attendees.find((attendee) =>
         attendee._id.equals(objectifiedAttendeeId)
      );

      return foundAttendee;
   },

   async removeAttendee(attendeeId) {
      //Implement Code here
      // TODO input checking
      // TODO functionality
      attendeeId = help.checkIsProperString(attendeeId);
      if (!ObjectId.isValid(attendeeId)) throw `attendee id is invalid`;

      const objectifiedAttendeeId = new ObjectId(attendeeId);
      const eventCollection = await events();
      const found = await eventCollection.findOneAndUpdate(
         {
            "attendees._id": { $eq: objectifiedAttendeeId },
         },
         {
            $pull: {
               "attendees": { "_id": objectifiedAttendeeId },
            },

            $inc: { totalNumberOfAttendees: -1 },
         }
      );

      if (!found) throw `${attendeeId} not an id of any attendees`;

      return await eventData.get(String(found._id));
   },
};

export default exportedMethods;
