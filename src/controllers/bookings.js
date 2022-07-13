const { Booking } = require("../models/BookingsModel.js");
const sanitize = require("mongo-sanitize");
const logError = require("../helpers/logError.js");

async function findBookings(firstName, lastName) {
  try {
    const bookings = await Booking.find({ firstName, lastName });
    return bookings;
  } catch (err) {
    logError(err);
  }
}

async function sendBookings(req, res, next) {
  try {
    const { firstName, lastName } = req.locals;

    const bookings = await findBookings(firstName, lastName);

    res.render("bookings", { bookings });
  } catch (err) {
    next(err);
  }
}

async function saveBooking(req, res, next) {
  try {
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

    const sanitizedFirstName = sanitize(firstName).trim().toLowerCase();
    const sanitizedLastName = sanitize(lastName).trim().toLowerCase();

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
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
    };

    const newBooking = await Booking.create(bookingData);

    if (!newBooking) {
      throw new Error("Failed to create a booking");
    }

    res.cookie("firstname", firstName, { httpOnly: true, secure: true });
    res.cookie("lastname", lastName, { httpOnly: true, secure: true });

    const bookings = await findBookings(sanitizedFirstName, sanitizedLastName);

    if (!bookings) {
      throw new Error("No bookings found");
    }

    res.render("bookings", { bookings });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendBookings, saveBooking };
