const { Booking } = require("../models/BookingsModel.js");
const sanitize = require("mongo-sanitize");

async function findBookings(firstName, lastName) {
  const bookings = await Booking.find({ firstName, lastName });
  return bookings;
}

async function validateName(req, res) {
  const { firstname: firstName, lastname: lastName } = req.cookies;

  if (!firstName || !lastName) {
    res.render("askname");
    return;
  }

  const sanitizedFirstName = sanitize(firstName).trim().toLowerCase();
  const sanitizedLastName = sanitize(lastName).trim().toLowerCase();

  const bookings = await findBookings(sanitizedFirstName, sanitizedLastName);

  res.render("bookings", { bookings });
}

async function saveBooking(req, res) {
  const {
    firstname: firstName,
    lastname: lastName,
    id,
    from,
    to,
    travelTime,
    distance,
    travelPrice,
    companyName,
    travelDates,
  } = req.body;

  const bookingData = {
    route: {
      routeId: id,
      from,
      to,
      travelPrice,
      travelTime,
      travelDates,
      distance,
      companyName,
    },
    firstName: firstName.trim().toLowerCase(),
    lastName: lastName.trim().toLowerCase(),
  };

  await Booking.create(bookingData);

  res.cookie("firstname", firstName, { httpOnly: true, secure: true });
  res.cookie("lastname", lastName, { httpOnly: true, secure: true });

  const bookings = await findBookings(firstName, lastName);

  res.render("bookings", { bookings });
}

module.exports = { validateName, saveBooking };
