const express = require("express");
const { tourController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");
const { authorize } = require("../middleware");

router.use(function timeLog(req, res, next) {
  console.log("User Route file: ", Date.now());
  next();
});

console.log(router, "router");

router.get('/',(req,res) => {
  return res.json(true)
})
router
  .route("/tours")
  .get(tourController.getTourList);
// router
//   .post("/user/register",validationSchema.registerSchema,userController.register);

router
  .route("/tour/:id")
  .get(tourController.getTourById);

router
  .route("/tours")
  .post(tourController.createTour);

router
  .route("/tours/:id")
  .put(authorize,tourController.updateTour);

module.exports = router;
