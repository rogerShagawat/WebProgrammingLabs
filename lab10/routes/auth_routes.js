//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router();
import help from "../helpers.js";
import * as userData from "../data/users.js";

router.route("/").get(async (req, res) => {
   //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
   return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
   .route("/register")
   .get(async (req, res) => {
      //code here for GET
      res.render("register", { title: "Register" });
   })
   .post(async (req, res) => {
      //code here for POST
      const inputData = req.body;
      let errors = [];

      try {
         inputData.firstNameInput = help.checkIsProperName(
            inputData.firstNameInput,
            "First Name"
         );
      } catch (e) {
         errors.push(e);
      }

      try {
         inputData.lastNameInput = help.checkIsProperName(
            inputData.lastNameInput,
            "Last Name"
         );
      } catch (e) {
         errors.push(e);
      }

      try {
         inputData.emailAddressInput = help.checkIsProperEmail(
            inputData.emailAddressInput,
            "Email Address"
         );
      } catch (e) {
         errors.push(e);
      }

      try {
         inputData.passwordInput = help.checkIsProperPassword(
            inputData.passwordInput,
            "Password"
         );
      } catch (e) {
         errors.push(e);
      }

      if (inputData.passwordInput !== inputData.confirmPasswordInput) {
         errors.push("Passwords do not match");
      }

      try {
         inputData.roleInput = help.checkIsProperRole(
            inputData.roleInput,
            "Role"
         );
      } catch (e) {
         errors.push(e);
      }

      try {
         const {
            firstNameInput,
            lastNameInput,
            emailAddressInput,
            passwordInput,
            roleInput,
         } = inputData;
         const newUser = await userData.registerUser(
            firstNameInput,
            lastNameInput,
            emailAddressInput,
            passwordInput,
            roleInput
         );
         if (newUser.insertedUser) {
            res.redirect(`/login`);
         } else {
            res.status(500).render("register", {
               title: "Register",
               hasErrors: true,
               errors: ["Internal Server Error"],
            });
         }
      } catch (e) {
         res.status(500).render("register", {
            title: "Register",
            hasErrors: true,
            errors: ["Internal Server Error", e],
         });
      }
   });

router
   .route("/login")
   .get(async (req, res) => {
      //code here for GET
      res.render("login", { hasErrors: false });
   })
   .post(async (req, res) => {
      //code here for POST
      const inputData = req.body;
      let errors = [];

      try {
         inputData.emailAddressInput = help.checkIsProperEmail(
            inputData.emailAddressInput,
            "Email Address"
         );
      } catch (e) {
         errors.push(e);
      }

      try {
         inputData.passwordInput = help.checkIsProperPassword(
            inputData.passwordInput,
            "Password"
         );
      } catch (e) {
         errors.push(e);
      }

      if (errors.length > 0) {
         res.status(400).render("login", {
            title: "Login",
            hasErrors: true,
            errors: errors,
         });
         return;
      }

      try {
         const loggedInUser = await userData.loginUser(
            inputData.emailAddressInput,
            inputData.passwordInput
         );

         req.session.user = {
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            emailAddress: loggedInUser.emailAddress,
            role: loggedInUser.role,
         };

         if (loggedInUser.role === "admin") {
            res.redirect("/admin");
         } else if (loggedInUser.role === "user") {
            res.redirect("/protected");
         }
      } catch (e) {
         errors.push(e);
         res.status(400).render("login", {
            title: "Login",
            hasErrors: true,
            errors: ["Username or password is incorrect."],
         });
      }
   });

router.route("/protected").get(async (req, res) => {
   //code here for GET
   try {
      const curTime = new Date().toUTCString();

      const isUserAdmin = req.session.user.role === "admin";

      res.render("protected", {
         title: "Protected",
         firstName: req.session.user.firstName,
         lastName: req.session.user.lastName,
         currentTime: curTime,
         role: req.session.user.role,
         isUserAdmin: isUserAdmin,
      });
   } catch (e) {
      res.redirect("/error", { error: e });
   }
});

router.route("/admin").get(async (req, res) => {
   //code here for GET
   try {
      const curTime = new Date().toUTCString();
      res.render("admin", {
         title: "Admin",
         firstName: req.session.user.firstName,
         lastName: req.session.user.lastName,
         currentTime: curTime,
         role: req.session.user.role,
      });
   } catch (e) {
      res.redirect("/error", { error: e });
   }
});

router.route("/error").get(async (req, res) => {
   res.status(403).render("error", {
      title: "Error",
      statusType: 403,
      error: "You do not have permission to view this page",
   });
});

router.route("/logout").get(async (req, res) => {
   //code here for GET
   res.redirect("/login");
});

export default router;
