const mongoose = require("../configs/db");

const bookingSchema = {
  route: {
    routeId: String,
    from: String,
    to: String,
    travelPrice: String,
    travelTime: String,
    travelDates: String,
    distance: Number,
    companyName: String,
  },
  firstName: String,
  lastName: String,
};

const Booking = mongoose.model("Booking", bookingSchema);

module.exports.Booking = Booking;
