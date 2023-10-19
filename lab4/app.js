/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

// import * as help from "./helpers.js";
import * as events from "./data/events.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

let myMain = async () => {
   const db = await dbConnection();
   await db.dropDatabase();

   console.log("Let's add events!");

   let patrickBBQ;
   let rogerDog;
   let uncleJoes;

   try {
      // 1. Create a event of your choice.
      patrickBBQ = await events.create(
         "Patrick's Big End of Summer BBQ",
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
         "2:00PM",
         "8:00PM",
         false
      );
      // 2. Log the newly created event. (Just that event, not all events)
      console.log(patrickBBQ);
   } catch (error) {
      console.log(error);
   }

   try {
      // 3. Create another event of your choice.
      rogerDog = await events.create(
         "Roger's hot frankfurter function",
         "MEat stick! oh that's right i have to be atleast 25 characters in len.",
         {
            streetAddress: "My house",
            city: "Hoboken",
            state: "NJ",
            zip: "07030",
         },
         "rshagawa@stevens.edu",
         5000,
         0,
         "09/25/2025",
         "2:00AM",
         "9:00PM",
         true
      );
      // console.log(patrickBBQ);
   } catch (error) {
      console.log(error);
   }

   try {
      const queryAll = await events.getAll();
      // 4. Query all events, and log them all
      console.log(queryAll);
   } catch (error) {
      console.log(error);
   }

   try {
      // 5. Create the 3rd event of your choice.
      uncleJoes = await events.create(
         "The Ghost of Uncle Joe's: Halloweeen Benefit Masquerade Ball",
         "Join us at The Ghost of Uncle Joe's: Halloween Benefit Masquerade Ball for 2 spooky days/ni of costumes, music, and charitable fun :)         ",
         {
            streetAddress: "435 Newark Avenue",
            city: "Jersey City",
            state: "NJ",
            zip: "07302",
         },
         "rockitdocket@gmail.com",
         500,
         0,
         "10/20/2024",
         "5:00pm",
         "10:00pM",
         true
      );
      // 6. Log the newly created 3rd event. (Just that event, not all events)
      console.log(uncleJoes);
   } catch (error) {
      console.log(error);
   }

   try {
      // 7. Rename the first event
      patrickBBQ = await events.rename(
         patrickBBQ._id,
         "CANCELED Prof Hill was way too hungy"
      );
      // 8. Log the first event with the updated name.
      console.log(patrickBBQ);
   } catch (error) {
      console.log(error);
   }

   try {
      // 9. Remove the second event you created.
      const removedOutput = await events.remove(rogerDog._id);
      // console.log(removedOutput);
   } catch (error) {
      console.log(error);
   }

   try {
      const queryAll = await events.getAll();
      // 10. Query all events, and log them all
      console.log(queryAll);
   } catch (error) {
      console.log(error);
   }

   try {
      // 11. Try to create an event with bad input parameters to make sure it throws errors.
      const epicFail = await events.create(
         "The biggest loser failure moment",
         "we love to fail and make all sorts of errors and buy turkeys come here",
         {
            streetAddress: "Doghouse",
            city: "Boboken",
            state: "CT",
            zip: "81030",
         },
         "rshagawa@stevens.edu",
         10,
         0,
         "09/25/2025",
         "11:59AM",
         "12:28PM",
         true
      );
      console.log(epicFail);
   } catch (error) {
      console.log(error);
   }

   var badObjectId = "652ae0796521c038047c1a58";
   try {
      // 12. Try to remove an event that does not exist to make sure it throws errors.
      const epicFail = await events.remove(badObjectId);
      console.log(`Did not error ${epicFail}`);
   } catch (error) {
      console.log(error);
   }

   try {
      // 13. Try to rename an event that does not exist to make sure it throws errors.
      const epicFail = await events.rename(badObjectId, "Please fail");
   } catch (error) {
      console.log(error);
   }

   try {
      // 14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
      const epicFail = await events.rename(rogerDog._id, true);
      console.log(`rename did not error properly`);
   } catch (error) {
      console.log(error);
   }

   try {
      //15. Try getting an event by ID that does not exist to make sure it throws errors.
      const epicFail = await events.get(badObjectId);
   } catch (error) {
      console.log(error);
   }

   await closeConnection();
};

myMain();
