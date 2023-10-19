//You will code the route in this file Lecture Code Refernece ->
//https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you
//used for lab 3 to return the list of books.  You can also import your
//getBookById(id) function and call it in the :/id route.

import * as express from "express";
import * as data from "../data/data.js";
import * as help from "../helpers.js";
const router = express.Router();

router
   .route("/")
   .get(async (req, res) => {
      try {
         const bookData = await data.getBooks();
         return res.json(bookData);
      } catch (error) {
         res.status(500).send(`Error: ${error}`);
      }
   });

router
   .route("/:id")
   .get(async (req, res) => {
      try {
         req.params.id = help.checkIsProperId(req.params.id);
         const book = await data.getBookById(req.params.id);
         return res.json(book);
      } catch (error) {
         res.status(404).json(`Error: ${error}`);
      }
   });

export default router;
