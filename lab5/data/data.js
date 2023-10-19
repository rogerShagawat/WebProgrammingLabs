/*
Here, you can export the functions you did for lab 3 to get the authors, books,
getBookByID, getAuthorById.  
You will import these functions into your routing files and call the relevant
function depending on the route. 
*/

import * as help from "../helpers.js";
import axios from "axios";

async function getAuthors() {
   try {
      const { data } = await axios.get(
         "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
      );
      if (data.length < 1) throw `Authors Not Found!`;
      return data;
   } catch (e) {
      if (e.code === "ENOTFOUND") throw "Error: Invalid URL";
      else if (e.response)
         throw `Error: ${e.response.status}: ${e.response.statusText}`;
      else throw `Error: ${e}`;
   }
}

async function getBooks() {
   try {
      const { data } = await axios.get(
         "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
      );
      if (data.length < 1) throw `Books Not Found!`;
      return data;
   } catch (e) {
      if (e.code === "ENOTFOUND") throw "Error: Invalid URL";
      else if (e.response)
         throw `Error: ${e.response.status}: ${e.response.statusText}`;
      else throw `Error: ${e}`;
   }
}

async function getAuthorById(id) {
   help.checkIsUndefined(id, "getAuthorById id parameter");
   help.checkIsProperString(id, "getAuthorById id parameter");
   id = id.trim();
   let idRegEx = new RegExp(`^${id}$`);

   let data = await getAuthors();
   [data] = data.filter((obj) => {
      return obj["id"].match(idRegEx);
   });

   try {
      help.checkIsProperObject(data);
   } catch (error) {
      throw `Author not found!`;
   }

   return data;
}

async function getBookById(id) {
   help.checkIsUndefined(id, "getBookById id parameter");
   help.checkIsProperString(id, "getBookById id parameter");
   id = id.trim();
   let idRegEx = new RegExp(`^${id}$`);

   let data = await getBooks();
   [data] = data.filter((obj) => {
      return obj["id"].match(idRegEx);
   });

   try {
      help.checkIsProperObject(data);
   } catch (error) {
      throw `Book not found!`;
   }
   return data;
}

export { getAuthors, getBooks, getAuthorById, getBookById };
