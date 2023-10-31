import * as help from "./helpers.js";
import * as seed from "./seed.js";
import express from "express";
const app = express();
import configRoutesFunction from "./routes/index.js";

configRoutesFunction(app);

app.listen(3000, () => {
   console.log("We've now got a server!");
   console.log("Your routes will be running on http://localhost:3000");
});


seed.runSetup();
// try {
//    console.log(`Didn't fail: ${help.checkIsProperEvent(undefined, -1)}`);
// } catch (error) {
//    console.log(`Error: ${error}`);
// }
