// This data file should export all functions using the ES6 standard as shown in the lecture code

import * as help from "../helpers";

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
   //Implement Code here
   // TODO input checking
   // TODO functionality
   let newAttendee = {};
   newAttendee["eventId"] = eventId;
   newAttendee["firstName"] = firstName;
   newAttendee["lastName"] = lastName;
   newAttendee["emailAddress"] = emailAddress;
   newAttendee = help.checkAndFixAttendees(newAttendee, "attendee");
};

const getAllAttendees = async (eventId) => {
   //Implement Code here
   // TODO input checking
   // TODO functionality
};

const getAttendee = async (attendeeId) => {
   //Implement Code here
   // TODO input checking
   // TODO functionality
};

const removeAttendee = async (attendeeId) => {
   //Implement Code here
   // TODO input checking
   // TODO functionality
};
