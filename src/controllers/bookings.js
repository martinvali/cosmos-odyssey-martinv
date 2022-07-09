const { Booking } = require("../models/BookingsModel.js");

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

  const bookings = await findBookings(firstName, lastName);

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
    firstName,
    lastName,
  };

  await Booking.create(bookingData);

  res.cookie("firstName", firstName, { httpOnly: true, secure: true });
  res.cookie("lastName", lastName, { httpOnly: true, secure: true });

  const bookings = await findBookings(firstName, lastName);

  res.render("bookings", { bookings });
}

module.exports = { validateName, saveBooking };
