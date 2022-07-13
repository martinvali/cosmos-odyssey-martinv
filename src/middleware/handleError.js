function handleError(err, req, res, next) {
  const errorMessages = [
    "Failed to create a booking",
    "No bookings found",
    "No routes found",
  ];

  console.log("handleError:", err);

  const { message: errorMessage } = err;

  res.status(500);

  if (errorMessages.includes(errorMessage)) {
    res.render("error", { errorMessage });
  } else {
    const errorMessage = "Something went wrong";
    res.render("error", { errorMessage });
  }
}

module.exports = handleError;
