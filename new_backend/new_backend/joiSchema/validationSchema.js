const Joi = require("joi");

const { validateRequest } = require("../middleware");

const email = Joi.string().min(3).max(50).email().required();
const password = Joi.string().min(6).max(15).required();



const registerSchema = (req, res, next) => {
  const schema = Joi.object({
    email: email,
    password: password,
    phone:Joi.number(),
    role: Joi.string().min(3).max(50),
  });
  validateRequest(req, res, next, schema);
}

const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: email,
    password: password,
  });
  validateRequest(req, res, next, schema);
}
const updateSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: email,
  skills: Joi.string().required(),
});
module.exports = {
  registerSchema,
  loginSchema,
  updateSchema
};
