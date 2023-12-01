import help from "../helpers.js";

/*
For the password, it must be a valid string (no empty spaces and no spaces
but can be any other character including special characters) and should be a
minimum of 8 characters long. If it fails any of those conditions, you will
throw an error.  The constraints for password will be: There needs to be at
least one uppercase character, there has to be at least one number and there
has to be at least one special character:  for example:  Not valid: test123,
test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*%
*/

// Passwords

test("Throws on invalid password", () => {
   expect(() => help.checkIsProperPassword("")).toThrow(/empty/);
   expect(() => help.checkIsProperPassword(" ")).toThrow(/whitespace/);
   expect(() => help.checkIsProperPassword("fasad fLf fffL")).toThrow(
      /whitespace/
   );
   expect(() => help.checkIsProperPassword(" fasad fLf fffL   ")).toThrow(
      /whitespace/
   );
   expect(() => help.checkIsProperPassword("test123")).toThrow();
   expect(() => help.checkIsProperPassword("test123$")).toThrow();
   expect(() => help.checkIsProperPassword("foobar")).toThrow();
   expect(() => help.checkIsProperPassword("tS12$")).toThrow();
   expect(() => help.checkIsProperPassword("1234567")).toThrow(/8/);
   expect(() => help.checkIsProperPassword(true)).toThrow();
   expect(() => help.checkIsProperPassword(1234)).toThrow();
   expect(() => help.checkIsProperPassword(null)).toThrow();
   expect(() => help.checkIsProperPassword(undefined)).toThrow();
   expect(() => help.checkIsProperPassword({})).toThrow();
   expect(() => help.checkIsProperPassword([])).toThrow();
});

test("Returns valid passwords", () => {
   expect(help.checkIsProperPassword("Test123$")).toBe("Test123$");
   expect(help.checkIsProperPassword("FooBar123*")).toBe("FooBar123*");
   expect(help.checkIsProperPassword("HorsePull748*%")).toBe("HorsePull748*%");
   expect(help.checkIsProperPassword("  HorsePull748*%   ")).toBe(
      "HorsePull748*%"
   );
});

// Names

test("Throw on invalid Names", () => {
   expect(() => help.checkIsProperName(true)).toThrow();
   expect(() => help.checkIsProperName(1234)).toThrow();
   expect(() => help.checkIsProperName(null)).toThrow();
   expect(() => help.checkIsProperName(undefined)).toThrow();
   expect(() => help.checkIsProperName({})).toThrow();
   expect(() => help.checkIsProperName([])).toThrow();
   expect(() => help.checkIsProperName("1")).toThrow(/between/);
   expect(() => help.checkIsProperName("12345678901234567890123456")).toThrow(
      /between/
   );
});

test("Returns valid names", () => {
   expect(help.checkIsProperName("12")).toBe("12");
   expect(help.checkIsProperName("   12   ")).toBe("12");
   expect(help.checkIsProperName("  Roger Shagawat ")).toBe("Roger Shagawat");
});

test("Throw on bad email", () => {
   expect(() => help.checkIsProperName(true)).toThrow();
   expect(() => help.checkIsProperName(1234)).toThrow();
   expect(() => help.checkIsProperName(null)).toThrow();
   expect(() => help.checkIsProperName(undefined)).toThrow();
   expect(() => help.checkIsProperName({})).toThrow();
   expect(() => help.checkIsProperName([])).toThrow();
   expect(() => help.checkIsProperEmail("    ")).toThrow();
   expect(() => help.checkIsProperEmail("abcdefg")).toThrow();
   expect(() => help.checkIsProperEmail("userexample.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@example@domain.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@com")).toThrow();
   expect(() => help.checkIsProperEmail("@domain.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@.")).toThrow();
   expect(() => help.checkIsProperEmail("user@domain..com")).toThrow();
   expect(() => help.checkIsProperEmail("user@dom_ain.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@domain#.com")).toThrow();
   expect(() => help.checkIsProperEmail("user @domain.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@ domain.com")).toThrow();
   expect(() => help.checkIsProperEmail("user@domain.1234")).toThrow();
   expect(() => help.checkIsProperEmail(`"user"@domain.com`)).toThrow();
});

test("Returns valid email adress", () => {
   expect(help.checkIsProperEmail("email@address.com")).toBe("email@address.com");
   expect(help.checkIsProperEmail("    email1@address.com    ")).toBe("email1@address.com");
});

test("Throw on bad role", () => {
   expect(() => help.checkIsProperRole(true)).toThrow();
   expect(() => help.checkIsProperRole(1234)).toThrow();
   expect(() => help.checkIsProperRole(null)).toThrow();
   expect(() => help.checkIsProperRole(undefined)).toThrow();
   expect(() => help.checkIsProperRole({})).toThrow();
   expect(() => help.checkIsProperRole([])).toThrow();
   expect(() => help.checkIsProperRole("")).toThrow();
   expect(() => help.checkIsProperRole("  ")).toThrow();
   expect(() => help.checkIsProperRole("not admin")).toThrow();
});

test("Returns valid role", () => {
   expect(help.checkIsProperRole("admin")).toBe("admin");
   expect(help.checkIsProperRole("user")).toBe("user");
   expect(help.checkIsProperRole("   user  ")).toBe("user");
});