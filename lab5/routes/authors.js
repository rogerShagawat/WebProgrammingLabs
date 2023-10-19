//You will code the route in this file Lecture Code Refernece ->
//https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you
//used for lab 3 to return the list of authors and call it in the /authors
//route.  You can also import your getAuthorById(id) function and call it in the
//:/id route.

import * as express from "express";
import * as data from "../data/data.js";
import * as help from "../helpers.js";

const router = express.Router();

router
   .route("/")
   .get(async (req, res) => {
      try {
         const authorData = await data.getAuthors();
         return res.json(authorData);
      } catch (error) {
         res.status(500).send(`Error: ${error}`);
      }
   });

router
   .route("/:id")
   .get(async (req, res) => {
      try {
         req.params.id = help.checkIsProperId(req.params.id);
         const auth = await data.getAuthorById(req.params.id);
         return res.json(auth);
      } catch (error) {
         res.status(404).json(`Error: ${error}`);
      }
   });

export default router;
