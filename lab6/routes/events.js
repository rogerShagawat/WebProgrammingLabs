// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { eventData } from "../data/index.js";
import * as help from "../helpers.js";
import { Router, json } from "express";
const router = Router();

router
   .route("/")
   .get(async (req, res) => {
      //code here for GET
      try {
         const allEvents = await eventData.getAll();
         return res.json(allEvents);
      } catch (error) {
         res.status(500).send(`Error: ${error}`);
      }
   })
   .post(async (req, res) => {
      //code here for POST
      json(req.body);
      console.log(req.body);
      req.body = help.checkIsProperEventPost(req.body, "Body of post");
      const updatedData = req.body;
      //make sure there is something in the req.body
      if (!updatedData || Object.keys(updatedData).length === 0) {
         return res
            .status(400)
            .json({ error: "There are no fields in the request body" });
      }
      // req.params.id = help.checkIsProperId(req.params.id, "ID url param");
      let newEvent = {};
      newEvent["eventName"] = updatedData.eventName;
      newEvent["description"] = updatedData.description;
      newEvent["eventLocation"] = updatedData.eventLocation;
      newEvent["contactEmail"] = updatedData.contactEmail;
      newEvent["maxCapacity"] = updatedData.maxCapacity;
      newEvent["priceOfAdmission"] = updatedData.priceOfAdmission;
      newEvent["eventDate"] = updatedData.eventDate;
      newEvent["startTime"] = updatedData.startTime;
      newEvent["endTime"] = updatedData.endTime;
      newEvent["publicEvent"] = updatedData.publicEvent;
      newEvent["attendees"] = [];
      newEvent["totalNumberOfAttendees"] = 0;

      try {
         newEvent = help.checkAndFixEventObject(newEvent, "newEvent");
      } catch (error) {
         return res.status(400).json({ error: `ERROR: ${error}` });
      }

      try {
         newEvent = await eventData.create(
            updatedData.eventName,
            updatedData.description,
            updatedData.eventLocation,
            updatedData.contactEmail,
            updatedData.maxCapacity,
            updatedData.priceOfAdmission,
            updatedData.eventDate,
            updatedData.startTime,
            updatedData.endTime,
            updatedData.publicEvent
         );
      } catch (error) {
         return res.status(400).json({ error: `${error}` });
      }

      return res.status(200).json(newEvent);
   });

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
      //try getting the event by ID
      try {
         const event = await eventData.get(req.params.eventId);
         res.json(event);
      } catch (e) {
         return res.status(404).json({ error: e });
      }
   })
   .delete(async (req, res) => {
      //code here for DELETE
      try {
         req.params.eventId = help.checkIsProperId(
            req.params.eventId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }
      //try getting the event by ID
      try {
         const event = await eventData.remove(req.params.eventId);
         res.status(200).json(event);
      } catch (e) {
         res.status(404).json({ error: e });
      }
   })
   .put(async (req, res) => {
      //code here for PUTtry {
      try {
         req.params.eventId = help.checkIsProperId(
            req.params.eventId,
            "ID URL Parameter"
         );
      } catch (error) {
         return res.status(400).json({ error: error });
      }

      json(req.body);
      const updatedData = req.body;
      req.body = help.checkIsProperEventPut(req.body, "Body of put");
      //make sure there is something in the req.body
      if (!updatedData || Object.keys(updatedData).length === 0) {
         return res
            .status(400)
            .json({ error: "There are no fields in the request body" });
      }

      let updatedEvent = {};
      updatedEvent["eventName"] = updatedData.eventName;
      updatedEvent["description"] = updatedData.description;
      updatedEvent["eventLocation"] = updatedData.eventLocation;
      updatedEvent["contactEmail"] = updatedData.contactEmail;
      updatedEvent["maxCapacity"] = updatedData.maxCapacity;
      updatedEvent["priceOfAdmission"] = updatedData.priceOfAdmission;
      updatedEvent["eventDate"] = updatedData.eventDate;
      updatedEvent["startTime"] = updatedData.startTime;
      updatedEvent["endTime"] = updatedData.endTime;
      updatedEvent["publicEvent"] = updatedData.publicEvent;
      updatedEvent["attendees"] = [];
      updatedEvent["totalNumberOfAttendees"] = 0;

      try {
         updatedEvent = help.checkAndFixEventObject(
            updatedEvent,
            "updatedEvent"
         );
      } catch (error) {
         return res.status(400).json({ error: `ERROR: ${error}` });
      }

      try {
         updatedEvent = await eventData.update(
            req.params.eventId,
            updatedData.eventName,
            updatedData.description,
            updatedData.eventLocation,
            updatedData.contactEmail,
            updatedData.maxCapacity,
            updatedData.priceOfAdmission,
            updatedData.eventDate,
            updatedData.startTime,
            updatedData.endTime,
            updatedData.publicEvent
         );
      } catch (error) {
         return res.status(400).json({ error: `${error}` });
      }

      return res.status(200).json(updatedEvent);
   });

export default router;
