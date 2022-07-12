function handleError(err, result) {
  const errorMessages = [
    "Failed to create a booking",
    "No bookings found",
    "No routes found",
  ];

  const { message: errorMessage } = err;

  if (errorMessages.includes(errorMessage)) {
    res.render("error", { errorMessage });
  } else {
    const errorMessage = "Something went wrong";
    res.render("error", { errorMessage });
  }
}

module.exports = handleError;
