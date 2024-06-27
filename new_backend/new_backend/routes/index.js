const express = require("express");
const userRoute = require("./user.routes");
const tourRoute = require("./tour.routes");
const bookingRoute = require('./booking.routes');
const feedbackRoute = require('./feedback.routes');

const { BASE_API_URL } = require("../utils/env");

const router = express.Router();
console.log("Call routers")
const defaultRoutes = [
  {
    route: userRoute,
  },
  {
    route: tourRoute,
  },
  {
    route: bookingRoute,
  },
  {
    route: feedbackRoute,
  },
];
console.log(BASE_API_URL,"BASE_API_URL")
defaultRoutes.forEach((route) => {
  console.log(route.route,"route.route")
  router.use(BASE_API_URL,route.route);
});

module.exports = router;
