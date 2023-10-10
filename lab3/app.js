/* Roger Shagawat 10441828 I pledge my honor that I have abided by the Stevens Honor System. */

/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as help from "./helpers.js";
import * as auth from "./authors.js";
import * as book from "./books.js";

/* getAllBooksWithAuthorName */

try {
   const test = await book.getAllBooksWithAuthorName();
   console.log(test);
} catch (e) {
   console.log(e);
}

/* priceRange */

try {
   const test = await book.priceRange(5.99, 30);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(-5, -3);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(12, -3);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange();
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(5);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(false, true);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange("5", "10");
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(5, "10");
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(-5, 3);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.priceRange(10, 10);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

/* sameGenre */

try {
   const test = await book.sameGenre("    Memoir   ");
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.sameGenre(-1);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.sameGenre(1001);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.sameGenre();
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.sameGenre(false);
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

try {
   const test = await book.sameGenre("foo bar");
   console.log(test.splice(0, 5));
} catch (e) {
   console.log(e);
}

/* getAuthorName */

try {
   const test = await book.getAuthorName(
      "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
   );
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getAuthorName(
      "    99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e "
   );
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getAuthorName(-1);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getAuthorName(1001);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getAuthorName();
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getAuthorName(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
   );
   console.log(test);
} catch (e) {
   console.log(e);
}

/* getBookById */

try {
   const test = await book.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById(
      "      e38ee52b-f3e8-4abf-b759-994f002bb1e6           "
   );
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById(-1);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById(1001);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById();
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById("      ");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await book.getBookById("7989fa5e-5617-43f7-a931-46036f9dbcff");
   console.log(test);
} catch (e) {
   console.log(e);
}

/* sameBirthday */

try {
   const test = await auth.sameBirthday(10, 12);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday(10, 29);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday(9, 31);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday(13, 25);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday(2, 30);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday("09", "31");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.sameBirthday();
   console.log(test);
} catch (e) {
   console.log(e);
}

/* getBookNames */

try {
   const test = await auth.getBookNames("   FranCiska ", "    PrenDiviLLe");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames("   Prisca ", "    Vakhonin");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames(1234, 5678);
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames(" ", " ");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames("roger", "shagawat");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames("Perrine", "Greenough");
   console.log(test);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getBookNames("   fsdfd  ", "   ");
   console.log(test);
} catch (e) {
   console.log(e);
}

/* getBooks */

try {
   const books = await help.getBooks();
   console.log(books);
} catch (e) {
   console.log(e);
}

/* searchAuthorByName */

try {
   const authorData = await auth.searchAuthorByName("Tom");
   console.log(authorData);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.searchAuthorByName("   TOM   ");
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.searchAuthorByName("foobar");
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.searchAuthorByName("     ");
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.searchAuthorByName(-1);
   console.log(test);
} catch (error) {
   console.log(error);
}

/* getAuthorById */

try {
   const authorData = await auth.getAuthorById(
      "bbb3f25b-597e-42cf-adcd-4b6f04c9373d"
   );
   console.log(authorData);
} catch (e) {
   console.log(e);
}

try {
   const authorData = await auth.getAuthorById(
      "     bbb3f25b-597e-42cf-adcd-4b6f04c9373d  "
   );
   console.log(authorData);
} catch (e) {
   console.log(e);
}

try {
   const test = await auth.getAuthorById(-1);
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.getAuthorById(1001);
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.getAuthorById();
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.getAuthorById(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
   );
   console.log(test);
} catch (error) {
   console.log(error);
}

try {
   const test = await auth.getAuthorById("    ");
   console.log(test);
} catch (error) {
   console.log(error);
}


/* youngestOldest */

try {
   const test = await auth.youngestOldest();
   console.log(test);
} catch (e) {
   console.log(e);
}