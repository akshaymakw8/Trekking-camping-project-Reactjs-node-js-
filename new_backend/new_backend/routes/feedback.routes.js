const express = require("express");
const { feedbackController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");
const { authorize } = require("../middleware");

router.use(function timeLog(req, res, next) {
  console.log("User Route file: ", Date.now());
  next();
});


router.get('/',(req,res) => {
  return res.json(true)
})
// router
//   .route("/tours")
//   .get(tourController.getTourList);
// router
//   .post("/user/register",validationSchema.registerSchema,userController.register);

// router
//   .route("/tour/:id")
//   .get(tourController.getTourById);

router
  .route("/feedback")
  .post(feedbackController.createFeedback);

// router
//   .route("/tours/:id")
//   .put(authorize,tourController.updateTour);

module.exports = router;
