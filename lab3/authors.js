/* Roger Shagawat 10441828 I pledge my honor that I have abided by the Stevens Honor System. */

//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import * as help from "./helpers.js";

const getAuthorById = async (id) => {
   help.checkIsProperString(id, "getAuthorById parameter");
   id = id.trim();

   let data = await help.getAuthors();

   [data] = data.filter((obj) => {
      return obj["id"].match(id);
   });

   try {
      help.checkIsUndefined(data);
   } catch (error) {
      throw `Author not found.`;
   }

   return data;
};

const searchAuthorByName = async (searchTerm) => {
   help.checkIsProperString(searchTerm, "searchAuthorByName parameter");
   searchTerm = searchTerm.trim();

   let data = await help.getAuthors();

   let searchTermRegEx = new RegExp(searchTerm, "i");

   data = data.filter((obj) => {
      const firstMatch = obj["first_name"].match(searchTermRegEx);
      const lastMatch = obj["last_name"].match(searchTermRegEx);
      return firstMatch || lastMatch;
   });

   try {
      help.checkIsUndefined(data[0]);
   } catch (error) {
      throw `no authors found`;
   }

   data = help.sortByObjectField(data, "last_name");

   data = data.map((obj) => {
      return `${obj.first_name} ${obj.last_name}`;
   });

   return data;
};

const getBookNames = async (firstName, lastName) => {
   help.checkIsProperString(
      firstName,
      `getBookNames first parameter "firstName"`
   );
   help.checkIsProperString(
      lastName,
      `getBookNames first parameter "lastName"`
   );
   firstName = firstName.trim();
   lastName = lastName.trim();

   let authData = await help.getAuthors();
   let bookData = await help.getBooks();

   let firstNameRegEx = new RegExp(firstName, "i");
   let lastNameRegEx = new RegExp(lastName, "i");

   authData = authData.filter((obj) => {
      const firstMatch = obj["first_name"].match(firstNameRegEx);
      const lastMatch = obj["last_name"].match(lastNameRegEx);
      return firstMatch && lastMatch;
   });

   try {
      help.checkIsUndefined(authData[0]);
   } catch (error) {
      throw `No author ${firstName} ${lastName} in authors.json`;
   }

   const bookIds = authData.map((obj) => obj["books"]).flat(Infinity);
   const booksWrittenByAuth = bookData.filter((obj) =>
      bookIds.includes(obj["id"])
   );

   try {
      help.checkIsUndefined(booksWrittenByAuth[0]);
   } catch (error) {
      throw `Author ${firstName} ${lastName} has written no books.`;
   }

   const bookTitles = booksWrittenByAuth.map((obj) => obj["title"]).sort();

   return bookTitles;
};

const youngestOldest = async () => {
   // I know this is bad code lol but I have sunk cost fallacy
   let authData = await help.getAuthors();

   const compareAuthDOB = (auth1, auth2) => {
      let dob1, dob2;

      try {
         dob1 = new Date(auth1.date_of_birth);
      } catch (e) {
         throw `Date of birth invalid`;
      }

      try {
         dob2 = new Date(auth2.date_of_birth);
      } catch (e) {
         throw `Date of birth invalid`;
      }

      return dob1 - dob2;
   };

   authData = authData.sort(compareAuthDOB);

   let elderlyArr = [authData[0]];
   let dobOfOldest = new Date(authData[0].date_of_birth);
   let dobOfNextOldest = new Date(authData[1].date_of_birth);
   let i = 1;
   while (dobOfOldest == dobOfNextOldest && i < authData.length) {
      help.checkIsUndefined(authData[i]);
      elderlyArr.push(authData[i]);
      dobOfOldest = dobOfNextOldest;
      dobOfNextOldest = new Date(authData[i].date_of_birth);
      i++;
   }

   let lastIndex = authData.length - 1;
   let youthfulArr = [authData[lastIndex]];
   let dobOfYoungest = new Date(authData[lastIndex].date_of_birth);
   let dobOfNextYoungest = new Date(authData[lastIndex - 1].date_of_birth);
   i = lastIndex - 1;
   while (dobOfYoungest == dobOfNextYoungest && i >= 0) {
      help.checkIsUndefined(authData[i]);
      youthfulArr.push(authData[i]);
      dobOfYoungest = dobOfNextOldest;
      dobOfNextYoungest = new Date(authData[i].date_of_birth);
      i--;
   }

   let result = {};
   if (youthfulArr.length > 1) {
      result["youngest"] = youthfulArr.map(
         (auth) => `${auth.first_name} ${auth.last_name}`
      );
   } else {
      const auth = youthfulArr[0];
      result["youngest"] = `${auth.first_name} ${auth.last_name}`;
   }
   if (elderlyArr.length > 1) {
      result["oldest"] = elderlyArr.map(
         (auth) => `${auth.first_name} ${auth.last_name}`
      );
   } else {
      const auth = elderlyArr[0];
      result["oldest"] = `${auth.first_name} ${auth.last_name}`;
   }

   return result;
};

const sameBirthday = async (month, day) => {
   help.checkIsProperNumber(month, "sameBirthday month parameter");
   help.checkIsProperNumber(day, "sameBirthday day parameter");
   help.checkIsProperMonthDay(month, day, [
      "sameBirthday month parameter",
      "sameBirthday day parameter",
   ]);

   const authData = await help.getAuthors();

   let authAtBirthday = authData.filter((auth) => {
      const DOB = auth.date_of_birth;
      const DOBArr = DOB.split("/");
      const sameMonth = DOBArr[0] == month;
      const sameDay = DOBArr[1] == day;
      return sameMonth && sameDay;
   });

   try {
      help.checkIsUndefined(authAtBirthday[0]);
   } catch (error) {
      throw `No authors with that birthday.`;
   }

   if (authAtBirthday.length < 2) {
      throw `No two authors share that same birthday.`;
   }

   authAtBirthday = help.sortByObjectField(authAtBirthday, "last_name");

   const authNames = authAtBirthday.map(
      (auth) => `${auth.first_name} ${auth.last_name}`
   );

   // console.log(authAtBirthday);
   return authNames;
};

export {
   getAuthorById,
   searchAuthorByName,
   getBookNames,
   youngestOldest,
   sameBirthday,
};
