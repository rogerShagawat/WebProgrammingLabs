// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { attendeeData } from "../data/index.js";
import * as help from "../helpers.js";
import { Router } from "express";
const router = Router();

router
   .route("/:eventId")
   .get(async (req, res) => {
      //code here for GET
      try {
         req.params.eventId = help.checkIsProperId(
            req.params.eventId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }

      let getOut;
      try {
         getOut = await attendeeData.getAllAttendees(req.params.eventId.trim());
      } catch (error) {
         return res.status(404).json({ error: error });
      }

      return res.status(200).json(getOut);
   })
   .post(async (req, res) => {
      //code here for POST
      try {
         req.params.eventId = help.checkIsProperId(
            req.params.eventId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }

      let updatedData = req.body;
      console.log(updatedData);

      try {
         updatedData = help.checkIsProperAttendeePost(
            updatedData,
            "Body of Post"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }

      let createOut;
      try {
         createOut = await attendeeData.createAttendee(
            req.params.eventId.trim(),
            updatedData.firstName,
            updatedData.lastName,
            updatedData.emailAddress
         );
      } catch (error) {
         return res.status(404).json({ error: error });
      }
      return res.status(200).json(createOut);
   });

router
   .route("/attendee/:attendeeId")
   .get(async (req, res) => {
      //code here for GET
      try {
         req.params.attendeeId = help.checkIsProperId(
            req.params.attendeeId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }

      let getOut;
      try {
         getOut = await attendeeData.getAttendee(req.params.attendeeId.trim());
      } catch (error) {
         return res.status(404).json({ error: error });
      }

      return res.status(200).json(getOut);
   })
   .delete(async (req, res) => {
      //code here for DELETE
      try {
         req.params.attendeeId = help.checkIsProperId(
            req.params.attendeeId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }


      let getOut;
      try {
         getOut = await attendeeData.removeAttendee(req.params.attendeeId.trim());
      } catch (error) {
         return res.status(404).json({ error: error });
      }

      return res.status(200).json(getOut);
   });

export default router;
