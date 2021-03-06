const axios = require("axios");
const schedule = require("node-schedule");
const { Routes } = require("../models/RoutesModel");
const { io } = require("../configs/server.js");
const logError = require("../helpers/logError.js");

function fetchData() {
  axios
    .get("https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices")
    .then(async function (response) {
      const expirationDate = new Date(response.data.validUntil);
      const routesData = response.data.legs;
      const validUntil = expirationDate.getTime();
      const lastRoute = await Routes.findLatest();

      if (lastRoute && lastRoute.validUntil === validUntil) {
        return fetchData();
      }

      const newRoute = await Routes.create({ routes: routesData, validUntil });

      io.sockets.emit("newPrices");

      return schedule.scheduleJob(expirationDate, fetchData);
    })
    .catch(logError);
}

module.exports = fetchData;
