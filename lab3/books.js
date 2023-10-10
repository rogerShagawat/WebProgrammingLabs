/* Roger Shagawat 10441828 I pledge my honor that I have abided by the Stevens Honor System. */

//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import * as help from "./helpers.js";

const getBookById = async (id) => {
   help.checkIsProperString(id, "getBookById parameter");
   id = id.trim();

   let data = await help.getBooks();

   [data] = data.filter((obj) => {
      return obj["id"].match(id);
   });

   try {
      help.checkIsUndefined(data);
   } catch (error) {
      throw `Book not found.`;
   }

   return data;
};

const getAuthorName = async (bookId) => {
   help.checkIsProperString(bookId, "getAuthorName parameter");
   bookId = bookId.trim();

   const authData = await help.getAuthors();
   const book = await getBookById(bookId);
   const authID = book.authorId;

   const [auth] = authData.filter((obj) => {
      return obj["id"].match(authID);
   });

   try {
      help.checkIsUndefined(auth);
   } catch (error) {
      throw `Book not associated with any author.`;
   }

   return `${auth["first_name"]} ${auth["last_name"]}`;
};

const sameGenre = async (genre) => {
   help.checkIsProperString(genre, "sameGenre parameter");
   genre = genre.trim();

   const bookData = await help.getBooks();

   const booksInGenre = bookData.filter((book) =>
      book["genres"].includes(genre)
   );

   if (booksInGenre.length < 1) {
      throw `No books with provided genre "${genre}" in books.json`;
   }

   return booksInGenre;
};

const priceRange = async (min, max) => {
   help.checkIsProperNumber(min, "priceRange min parameter");
   help.checkIsProperNumber(max, "priceRange max parameter");

   if (min >= max) {
      throw `priceRange parameter not less than parameter max.`;
   }
   if (min < 0) {
      throw `priceRange parameter min less than 0.`;
   }
   if (max < 0) {
      throw `priceRange parameter max less than 0.`;
   }

   const bookData = await help.getBooks();

   const booksInRange = bookData.filter(
      (book) => book.price <= max && book.price >= min
   );

   if (booksInRange.length < 1) {
      throw `No books with price between ${min} and ${max}.`;
   }

   return booksInRange;
};

const getAllBooksWithAuthorName = async () => {
   const bookData = await help.getBooks();
   const authData = await help.getAuthors();

   const bookWithAuthName = bookData.map((book) => {
      const authId = book.authID;
      const [auth] = authData.filter((obj) => {
         return obj["id"].match(authId);
      });
      let newBook = {};
      newBook.id = book.id;
      newBook.title = book.title;
      newBook.genres = book.genres;
      newBook.publicationDate = book.publicationDate;
      newBook.publisher = book.publisher;
      newBook.summary = book.summary;
      newBook.isbn = book.isbn;
      newBook.language = book.language;
      newBook.pageCount = book.pageCount;
      newBook.price = book.price;
      newBook.format = book.format;
      newBook.author = `${auth.first_name} ${auth.last_name}`;
      return newBook;
   });

   return bookWithAuthName;
};

export {
   getBookById,
   getAuthorName,
   sameGenre,
   priceRange,
   getAllBooksWithAuthorName,
};
