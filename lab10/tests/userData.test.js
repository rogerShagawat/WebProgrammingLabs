import * as userData from "../data/users.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

const registerGood = { insertedUser: true };

test("Duplicate emails should fail", async () => {
   const db = await dbConnection();
   await db.dropDatabase();

   await expect(
      userData.registerUser(
         "Roger",
         "Shagawat",
         "roger123@cool.com",
         "Pogchamp123$",
         "user"
      )
   ).resolves.toStrictEqual(registerGood);

   await expect(
      userData.registerUser(
         "NotRoger",
         "NotShagawat",
         "roger123@cool.com",
         "NotPogchamp123$",
         "user"
      )
   ).rejects.toMatch(/already/);

   await expect(
      userData.registerUser(
         "Cool",
         "Guy",
         "coolguy@cool.com",
         "Pogchamp123$",
         "user"
      )
   ).resolves.toStrictEqual(registerGood);

   await expect(
      userData.registerUser(
         "NotRoger",
         "NotShagawat",
         "roger123@cool.com",
         "NotPogchamp123$",
         "admin"
      )
   ).rejects.toMatch(/already/);

   await db.dropDatabase();

   await expect(userData.registerUser()).rejects.toMatch("");
   await expect(userData.registerUser("firstName")).rejects.toMatch("");
   await expect(userData.registerUser("firstName", "lastName")).rejects.toMatch(
      ""
   );
   await expect(
      userData.registerUser("firstName", "lastName", "email@address.com")
   ).rejects.toMatch("");
   await expect(
      userData.registerUser(
         "firstName",
         "lastName",
         "email@address.com",
         "abcEasyas123$"
      )
   ).rejects.toMatch("");
   await expect(
      userData.registerUser(
         "firstName",
         "lastName",
         "email@address.com",
         "abcEasyas123$",
         "notAdmin"
      )
   ).rejects.toMatch("");
   await expect(
      userData.registerUser(
         "firstName",
         "lastName",
         "email@address.com",
         "abcEasyas123$",
         true
      )
   ).rejects.toMatch("");

   await expect(
      userData.registerUser(
         "firstName",
         "lastName",
         "email@address.com",
         "abcEasyas$",
         "admin"
      )
   ).rejects.toMatch("");

   await expect(
      userData.registerUser(
         [],
         "lastName",
         "email@address.com",
         "abcEasyas123$",
         "admin"
      )
   ).rejects.toMatch("");

   await db.dropDatabase();

   await expect(
      userData.registerUser(
         "First",
         "Last",
         "first@last.com",
         "Password123$",
         "user"
      )
   ).resolves.toStrictEqual(registerGood);


   await expect(
      userData.registerUser(
         "Admin",
         "AdminLast",
         "admin@admin.com",
         "Password123$",
         "admin"
      )
   ).resolves.toStrictEqual(registerGood);

   await expect(
      userData.registerUser(
         "User",
         "UserLast",
         "user@user.com",
         "Password123$",
         "user"
      )
   ).resolves.toStrictEqual(registerGood);

   await expect(
      userData.loginUser("first@last.com", "Password123$")
   ).resolves.toStrictEqual({
      firstName: "First",
      lastName: "Last",
      emailAddress: "first@last.com",
      role: "user",
   });


   await expect(
      userData.loginUser("first@last.com", "pasSword123$")
   ).rejects.toMatch("");


   await expect(
      userData.loginUser("first@lst.com", "password123$")
   ).rejects.toMatch("");

   // console.log("Done!");
   await closeConnection();
});