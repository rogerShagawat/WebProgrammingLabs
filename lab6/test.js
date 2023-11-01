import { attendeeData, eventData } from "./data/index.js";
import * as help from "./helpers.js";
import * as seed from "./seed.js";
import express from "express";
const app = express();
import configRoutesFunction from "./routes/index.js";
import { ObjectId } from "mongodb";
import { dbConnection } from "./config/mongoConnection.js";
// import {dbCollection} from "./config/mongoCollections.js"

app.use(express.json())

configRoutesFunction(app);

app.listen(3000, () => {
   console.log("We've now got a server!");
   console.log("Your routes will be running on http://localhost:3000");
});

const db = await dbConnection();

try {
   // We can recover from this; if it can't drop the collection, it's because
   await db.collection("events").drop();
} catch (e) {
   // the collection does not exist yet!
}

try {
   console.log(ObjectId.isValid("65413027bf7dfeb85682804e"));
} catch (error) {}

let patrickBBQ;
try {
   // 1. Create a event of your choice.
   patrickBBQ = await eventData.create(
      "Patrick's Big End of Summer BBQ",
      "Come join us for our yearly end of summer bbq!",
      {
         streetAddress: "1 Castle Point Terrace",
         city: "Hoboken",
         state: "NJ",
         zip: "07030",
      },
      "phill@stevens.edu",
      2,
      0,
      "08/25/2024",
      "2:00 PM",
      "8:00 PM",
      false
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(patrickBBQ);
} catch (error) {
   console.log(error);
}

console.log(patrickBBQ._id);

try {
   // 1. Create a event of your choice.
   const attendeeReturn = await attendeeData.createAttendee(
      String(patrickBBQ._id),
      "Roger",
      "Coolguys",
      "rogeriscool@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn);
} catch (error) {
   console.log(error);
}

try {
   // 1. Create a event of your choice.
   const pattrickGet = await eventData.get(String(patrickBBQ._id));
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(pattrickGet);
} catch (error) {
   console.log(error);
}
try {
   // 1. Create a event of your choice.
   const allEvents = await eventData.getAll();
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(allEvents);
} catch (error) {
   console.log(error);
}

let attendeeReturn;
try {
   // 1. Create a event of your choice.
   attendeeReturn = await attendeeData.createAttendee(
      String(patrickBBQ._id),
      "Bo",
      "Coolguys",
      "dontdobad@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn);
} catch (error) {
   console.log(`FAILURE: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const attendeeReturn2 = await attendeeData.createAttendee(
      String(patrickBBQ._id),
      "Stork",
      "WithBeak",
      "storkman@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn2);
} catch (error) {
   console.log(`Success!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const attendeeGetAll = await attendeeData.getAllAttendees(
      String(patrickBBQ._id)
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeGetAll);
} catch (error) {
   console.log(`FAILURE!: ${error}`);
}

console.log(attendeeReturn._id);

try {
   const getOneAttendee = await attendeeData.getAttendee(
      String(attendeeReturn._id)
   );
   console.log(getOneAttendee);
} catch (error) {
   console.log(`EPIC FAIL :) ${error}`);
}

try {
   const getOneAttendee = await attendeeData.getAttendee(
      "6541524f7bb718ae06f32a64"
   );
   console.log(getOneAttendee);
} catch (error) {
   console.log(`Successful error: ${error}`);
}

try {
   const getOneAttendee = await attendeeData.removeAttendee(
      String(attendeeReturn._id)
   );
   console.log(getOneAttendee);
} catch (error) {
   console.log(`EPIC FAIL :) ${error}`);
}

let coleslawEvent;
try {
   // 1. Create a event of your choice.
   coleslawEvent = await eventData.create(
      "Coleslaw power party",
      "Don't push me cuz i'm close to the edge",
      {
         streetAddress: "Somewhere",
         city: "Hoboken",
         state: "NJ",
         zip: "07030",
      },
      "tomyork@stevens.edu",
      30,
      0,
      "10/28/2025",
      "1:00 PM",
      "9:00 PM",
      true
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(coleslawEvent);
} catch (error) {
   console.log(error);
}

try {
   // 1. Create a event of your choice.
   const attendeeReturn2 = await attendeeData.createAttendee(
      String(coleslawEvent._id),
      "Tom",
      "York",
      "tomyork@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn2);
} catch (error) {
   console.log(`FAIL: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const attendeeReturn2 = await attendeeData.createAttendee(
      String(coleslawEvent._id),
      "TomYorkWithHat",
      "York",
      "tomyork+withhat@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn2);
} catch (error) {
   console.log(`FAIL!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const attendeeReturn2 = await attendeeData.createAttendee(
      String(coleslawEvent._id),
      "TomYorkWithHat",
      "York",
      "tomyork+withhat@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn2);
} catch (error) {
   console.log(`Success!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const attendeeReturn2 = await attendeeData.createAttendee(
      String(coleslawEvent._id),
      "TomYork",
      "WithWig",
      "tomyork+withwig@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(attendeeReturn2);
} catch (error) {
   console.log(`FAIL!: ${error}`);
}

let removeMe;
try {
   // 1. Create a event of your choice.
   removeMe = await attendeeData.createAttendee(
      String(coleslawEvent._id),
      "TomYork",
      "Mistake",
      "tomyork+mistake@webprog.com"
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(removeMe);
} catch (error) {
   console.log(`FAIL!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const removeMe2 = await attendeeData.removeAttendee(String(removeMe._id));
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(removeMe2);
} catch (error) {
   console.log(`FAIL!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   const removeMe2 = await attendeeData.removeAttendee(String(removeMe._id));
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(removeMe2);
} catch (error) {
   console.log(`Sucess!: ${error}`);
}

try {
   // 1. Create a event of your choice.
   coleslawEvent = await eventData.update(
      String(coleslawEvent._id),
      "CANCLED Coleslaw power party",
      "You don't have to go home but you can't stay here",
      {
         streetAddress: "Somewhere",
         city: "Hoboken",
         state: "NJ",
         zip: "07030",
      },
      "tomyork@stevens.edu",
      30,
      0,
      "10/28/2025",
      "1:00 PM",
      "9:00 PM",
      true
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(coleslawEvent);
} catch (error) {
   console.log(error);
}

let bbq2;
try {
   // 1. Create a event of your choice.
   bbq2 = await eventData.create(
      "DUPLICATE Patrick's Big End of Summer BBQ",
      "Come join us for our yearly end of summer bbq!",
      {
         streetAddress: "1 Castle Point Terrace",
         city: "Hoboken",
         state: "NJ",
         zip: "07030",
      },
      "phill@stevens.edu",
      30,
      0,
      "08/25/2024",
      "2:00 PM",
      "8:00 PM",
      false
   );
   // 2. Log the newly created event. (Just that event, not all events)
   console.log(patrickBBQ);
} catch (error) {
   console.log(error);
}

try {
   const bbqremove = await eventData.remove(String(bbq2._id));
   console.log(bbqremove);
} catch (error) {
   console.log(`FAIL: ${error}`);
}

try {
   const bbqremove = await eventData.remove(String(bbq2._id));
   console.log(bbqremove);
} catch (error) {
   console.log(`Success: ${error}`);
}

