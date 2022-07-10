require("dotenv").config({ path: __dirname + "/configs/configs.env" });
const { app, server } = require("./configs/server.js");
const fetchData = require("./scheduler/fetchData.js");
const validateName = require("./middleware/validateSanitizeName.js");

// IMPORT CONTOLLERS
const sendHomePage = require("./controllers/home.js");
const sendRoutes = require("./controllers/routes.js");
const { sendBookings, saveBooking } = require("./controllers/bookings.js");

fetchData();

app.get("/", sendHomePage);

app.get("/routes", sendRoutes);

app.post("/bookings", saveBooking);

app.get("/bookings", validateName, sendBookings);

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
