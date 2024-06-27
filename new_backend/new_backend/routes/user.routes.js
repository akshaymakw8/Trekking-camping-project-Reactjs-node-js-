const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");
const { authorize } = require("../middleware");

router.use(function timeLog(req, res, next) {
  console.log("User Route file: ", Date.now());
  next();
});

console.log(router, "router");

console.log(userController.register, "validationSchema.registerSchema");
router.get('/',(req,res) => {
  return res.json(true)
})
router
  .route("/register")
  .post(validationSchema.registerSchema, userController.register);
// router
//   .post("/user/register",validationSchema.registerSchema,userController.register);

router
  .route("/login")
  .post(validationSchema.loginSchema, userController.login);

// router
//   .route("/user/profile")
//   .get(authorize, userController.getProfile);

router
  .route("/users")
  .get( userController.getUserList);

module.exports = router;
