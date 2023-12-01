// In this file, you must perform all client-side validation for every single
// form input (and the role dropdown) on your pages. The constraints for those
// fields are the same as they are for the data functions and routes. Using
// client-side JS, you will intercept the form's submit event when the form is
// submitted and If there is an error in the user's input or they are missing
// fields, you will not allow the form to submit to the server and will display
// an error on the page to the user informing them of what was incorrect or
// missing.  You must do this for ALL fields for the register form as well as
// the login form. If the form being submitted has all valid data, then you will
// allow it to submit to the server for processing. Don't forget to check that
// password and confirm password match on the registration form!

let loginForm = document.getElementById("login-form");
let registerForm = document.getElementById("register-form");
let errorDiv = document.getElementById("local-error");

function processRegisterForm(regForm) {
   const firstNameElem = document.getElementById("firstNameInput");
   const lastNameElem = document.getElementById("lastNameInput");
   const emailElem = document.getElementById("emailAddressInput");
   const passwordElem = document.getElementById("passwordInput");
   const confirmPasswordElem = document.getElementById("confirmPasswordInput");
   const roleElem = document.getElementById("roleInput");
   let firstNameVal;
   let lastNameVal;
   let emailVal;
   let passwordVal;
   let confirmPasswordVal;
   let roleVal;

   let errors = [];

   errorDiv.hidden = true;
   errorDiv.innerHTML = ""; // clear error div after every submit

   try {
      firstNameVal = checkIsProperName(firstNameElem.value, "First Name");
   } catch (e) {
      errors.push(e);
   }

   try {
      lastNameVal = checkIsProperName(lastNameElem.value, "Last Name");
   } catch (e) {
      errors.push(e);
   }

   try {
      emailVal = checkIsProperEmail(emailElem.value, "Email");
   } catch (e) {
      errors.push(e);
   }

   try {
      passwordVal = checkIsProperPassword(passwordElem.value, "Password");
   } catch (e) {
      errors.push(e);
   }

   try {
      confirmPasswordVal = checkIsProperPassword(
         confirmPasswordElem.value,
         "Confirm Password"
      );
   } catch (e) {
      errors.push(e);
   }

   try {
      roleVal = checkIsProperRole(roleElem.value, "Role");
   } catch (e) {
      errors.push(e);
   }

   if (passwordVal !== confirmPasswordVal) {
      errors.push("Passwords don't match");
   }

   if (errors.length !== 0) {
      errorDiv.hidden = false;
      let errorOl = document.createElement("ul");
      errors.forEach((err) => {
         let errorLi = document.createElement("li");
         errorLi.innerHTML = `Error: ${err}`;
         errorOl.appendChild(errorLi);
      });
      errorDiv.appendChild(errorOl);
      if (regForm.preventDefault) regForm.preventDefault();
      return false;
   }
}

if (registerForm) {
   if (registerForm.attachEvent) {
      registerForm.attachEvent("submit", processRegisterForm);
   } else {
      registerForm.addEventListener("submit", processRegisterForm);
   }
}

function processLoginForm(loginForm) {
   const emailElement = document.getElementById("emailAddressInput");
   const passwordElement = document.getElementById("passwordInput");
   let emailValue;
   let passwordValue;
   let errors = [];

   errorDiv.hidden = true;
   errorDiv.innerHTML = ""; // clear error div after every submit

   try {
      emailValue = checkIsProperEmail(emailElement.value, "Email");
   } catch (e) {
      console.error(e);
      errors.push(e);
   }

   try {
      passwordValue = checkIsProperPassword(passwordElement.value, "Password");
   } catch (e) {
      console.error(e);
      errors.push(e);
   }

   if (errors.length !== 0) {
      errorDiv.hidden = false;
      let errorOl = document.createElement("ul");
      errors.forEach((err) => {
         let errorLi = document.createElement("li");
         errorLi.innerHTML = `Error: ${err}`;
         errorOl.appendChild(errorLi);
      });
      // let errorLi = document.createElement("li");
      // errorLi.innerHTML = "Error: Username or password is incorrect.";
      // errorOl.appendChild(errorLi);
      errorDiv.appendChild(errorOl);
      if (loginForm.preventDefault) loginForm.preventDefault();
      return false;
   }
}

if (loginForm) {
   if (loginForm.attachEvent) {
      loginForm.attachEvent("submit", processLoginForm);
   } else {
      loginForm.addEventListener("submit", processLoginForm);
   }
}

function checkIsUndefined(val, valName) {
   if (!valName) throw "valName required";
   if (val === undefined) {
      throw `${valName} is undefined`;
   }
   return val;
}

function checkIsProperString(val, valName) {
   if (!valName) throw "valName required";
   val = checkIsUndefined(val, valName);
   if (typeof val !== "string") throw `${valName} is not a string`;
   val = val.trim();
   if (!val) throw `${valName} is empty or whitespace`;
   return val;
}

function checkIsProperPassword(val, valName) {
   if (!valName) throw "valName required";
   val = checkIsProperString(val, valName);

   if (val.length < 8) {
      throw `${valName} must be 8 characters or longer`;
   }

   const whiteSpaceRE = /\s/;
   if (whiteSpaceRE.test(val)) {
      throw `${valName} must not contain whitespace`;
   }

   const upperCaseRE = /[A-Z]/;
   if (!upperCaseRE.test(val)) {
      throw `${valName} must contain at least one upper case character`;
   }

   const numberRE = /[0-9]/;
   if (!numberRE.test(val)) {
      throw `${valName} must contain at least one number`;
   }

   const specialCharsRE = /[^a-zA-Z0-9]/;
   if (!specialCharsRE.test(val)) {
      throw `${valName} must contain at least one special character`;
   }

   return val;
}

function checkIsProperName(val, valName, minChars = 2, maxChars = 25) {
   if (!valName) throw "valName required";
   val = checkIsProperString(val, valName);
   if (val.length < minChars || val.length > maxChars) {
      throw `${valName} must be between ${minChars} and ${maxChars} characters long`;
   }
   return val;
}

function checkIsProperRole(val, valName) {
   const validRoles = ["admin", "user"];
   if (!valName) throw "valName required";
   val = checkIsProperString(val, valName);
   val = val.trim().toLowerCase();
   if (!validRoles.includes(val)) {
      throw `${valName} must be either "admin" or "user"`;
   }
   return val;
}

function checkIsProperEmail(val, valName) {
   if (!valName) throw "valName required";
   val = checkIsProperString(val, valName);
   val = val.trim();
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailRegex.test(val)) {
      throw `${valName} is not a valid email`;
   }
   return val;
}
