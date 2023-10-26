import * as help from "./helpers.js";

try {
   console.log(`Didn't fail: ${help.checkIsProperEvent(undefined, -1)}`);
} catch (error) {
   console.log(`Error: ${error}`);
}
