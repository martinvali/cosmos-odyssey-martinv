const sanitize = require("mongo-sanitize");

function validateSanitizeName(req, res, next) {
  const { firstname: firstName, lastname: lastName } = req.cookies;

  if (!firstName || !lastName) {
    res.render("askname");
    return;
  }

  const sanitizedFirstName = sanitize(firstName).trim().toLowerCase();
  const sanitizedLastName = sanitize(lastName).trim().toLowerCase();

  req.locals = {
    firstName: sanitizedFirstName,
    lastName: sanitizedLastName,
  };

  next();
}

module.exports = validateSanitizeName;
