const {
  Routes,
  addFlightTimes,
  sortPriceAscending,
  sortPriceDescending,
  sortTimeAscending,
  sortTimeDescending,
} = require("../models/RoutesModel.js");

async function handleRoutes(req, res) {
  const queryParameters = req.query;

  if (Object.keys(queryParameters).length === 0) {
    res.render("noresults");
    return;
  }

  const latestRoutes = await Routes.findLatest();

  const searchedRoute = await latestRoutes.findRoute(
    queryParameters.origin,
    queryParameters.destination
  );

  if (!searchedRoute) {
    res.render("noresults", {
      from: queryParameters.origin,
      to: queryParameters.destination,
    });
    return;
  }

  const flightTime = searchedRoute.providers[0].flightTime; // Check if flight time has been calculated for this route

  if (!flightTime) {
    addFlightTimes(searchedRoute);
    Routes.findByIdAndUpdate(latestRoutes.id, { latestRoutes });
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
}

module.exports = handleRoutes;
