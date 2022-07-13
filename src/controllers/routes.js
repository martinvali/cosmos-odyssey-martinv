const {
  Routes,
  addFlightTimes,
  sortPriceAscending,
  sortPriceDescending,
  sortTimeAscending,
  sortTimeDescending,
} = require("../models/RoutesModel.js");

async function sendRoutes(req, res, next) {
  try {
    const queryParameters = req.query;

    if (Object.keys(queryParameters).length === 0) {
      res.render("noresults");
      return;
    }

    const latestRoutes = await Routes.findLatest();

    if (!latestRoutes) {
      throw new Error("No routes found");
    }

    const searchedRoute = await latestRoutes.findRoute(
      queryParameters.origin,
      queryParameters.destination
    );

    if (!searchedRoute) {
      res.render("noresults", {
        from: queryParameters.origin,
        to: queryParameters.destination,
      });
    }

    const flightTime = searchedRoute.providers[0].flightTime;

    if (!flightTime) {
      addFlightTimes(searchedRoute);
    }

    if (queryParameters.sort === "priciest") {
      sortPriceDescending(searchedRoute);
    } else if (queryParameters.sort === "fastest") {
      sortTimeAscending(searchedRoute);
    } else if (queryParameters.sort === "slowest") {
      sortTimeDescending(searchedRoute);
    } else {
      sortPriceAscending(searchedRoute);
    }

    res.render("results", {
      searchedRoute,
      sort: queryParameters.sort,
      filter: queryParameters.filter || [],
    });
  } catch (err) {
    next(err);
  }
}

module.exports = sendRoutes;
