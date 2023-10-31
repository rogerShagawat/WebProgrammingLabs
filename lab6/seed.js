import { events } from "./config/mongoCollections.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

async function runSetup() {
   const db = await dbConnection();
   try {
      // We can recover from this; if it can't drop the collection, it's because
      await db.collection("events").drop();
   } catch (e) {
      // the collection does not exist yet!
   }
   const eventCollection = await db.collection("events");
}

export { runSetup };
