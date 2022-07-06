const mongoose = require("../configs/db");

const routeInfoSchema = new mongoose.Schema({
  id: String,
  from: {
    id: String,
    name: String,
  },
  to: {
    id: String,
    name: String,
  },
  distance: Number,
});
const providersSchema = new mongoose.Schema({
  id: String,
  company: {
    id: String,
    name: String,
  },
  price: Number,
  flightStart: Date,
  flightEnd: Date,
  flightTime: String,
  flightDates: String,
  millisecondsDifference: Number,
});

const routesSchema = new mongoose.Schema(
  {
    routes: [
      {
        id: String,
        routeInfo: routeInfoSchema,
        providers: [providersSchema],
      },
    ],
    validUntil: Number,
  },
  { capped: { size: 1000000, max: 15 }, timestamps: true }
);

routesSchema.methods.findRoute = function (origin, destination) {
  return this.routes.find(function (route) {
    return (
      route.routeInfo.from.name === origin &&
      route.routeInfo.to.name === destination
    );
  });
};

routesSchema.statics.findLatest = async function () {
  const latestRoutes = await this.find({}).sort({ createdAt: -1 }).limit(1);
  return latestRoutes[0] || 0;
};

function sortPriceAscending(searchedRoute) {
  const routeProviders = searchedRoute.providers;
  routeProviders.sort(function (firstProvider, secondProvider) {
    return firstProvider.price - secondProvider.price;
  });
}

function sortPriceDescending(searchedRoute) {
  const routeProviders = searchedRoute.providers;
  routeProviders.sort(function (firstProvider, secondProvider) {
    return secondProvider.price - firstProvider.price;
  });
}

function sortTimeAscending(searchedRoute) {
  const routeProviders = searchedRoute.providers;
  routeProviders.sort(function (firstProvider, secondProvider) {
    return (
      firstProvider.millisecondsDifference -
      secondProvider.millisecondsDifference
    );
  });
}

function sortTimeDescending(searchedRoute) {
  const routeProviders = searchedRoute.providers;
  routeProviders.sort(function (firstProvider, secondProvider) {
    return (
      secondProvider.millisecondsDifference -
      firstProvider.millisecondsDifference
    );
  });
}

function addFlightTimes(searchedRoute) {
  const routeProviders = searchedRoute.providers;

  routeProviders.forEach(function (routeProvider) {
    const flightStart = new Date(routeProvider.flightStart);
    const flightEnd = new Date(routeProvider.flightEnd);
    const millisecondsDifference = flightEnd.getTime() - flightStart.getTime();
    const daysDifference = Math.trunc(
      millisecondsDifference / (1000 * 60 * 60 * 24)
    );

    const hoursDifference = Math.trunc(
      millisecondsDifference / (1000 * 60 * 60) - daysDifference * 24
    );

    const flightStartMonth = flightStart.toLocaleString("en-US", {
      month: "long",
    });

    const flightStartDate = flightStart.getDate();

    const flightEndMonth = flightEnd.toLocaleString("en-US", {
      month: "long",
    });

    const flightEndDate = flightEnd.getDate();

    routeProvider.flightTime = `${
      daysDifference !== 0 ? daysDifference + "d" : ""
    } ${hoursDifference !== 0 ? hoursDifference + "h" : ""}`.trim();
    routeProvider.flightDates = `${flightStartMonth} ${flightStartDate} - ${flightEndMonth} ${flightEndDate}`;
    routeProvider.millisecondsDifference = millisecondsDifference;
  });
}

const Routes = mongoose.model("Route", routesSchema);

module.exports = {
  Routes,
  addFlightTimes,
  sortPriceAscending,
  sortPriceDescending,
  sortTimeAscending,
  sortTimeDescending,
};
