const express = require("express");
const { bookingController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");
const { authorize } = require("../middleware");

router.use(function timeLog(req, res, next) {
  console.log("User Route file: ", Date.now());
  next();
});

console.log(router, "router");

router.get('/book',(req,res) => {
  return res.json(true)
})
// router
//   .route("/tours")
//   .get(tourController.getTourList);
// router
//   .post("/user/register",validationSchema.registerSchema,userController.register);

router
  .route("/bookings")
  .get(bookingController.getBookingList);

router
  .route("/booking")
  .post(authorize,bookingController.createBooking);

  router
  .route("/booking/:id")
  .get(authorize,bookingController.getBookingById);

router
  .route("/booking/:id")
  .put(authorize,bookingController.updateBooking);

module.exports = router;
