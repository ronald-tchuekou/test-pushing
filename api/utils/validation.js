const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    numero: Joi.string().min(9),
    equipe: Joi.string().min(24).max(24),
    password: Joi.string().min(6).max(1024),
    confirmPassword: Joi.ref("password"),
  });
  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;