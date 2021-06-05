const joi = require("joi");

const register = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(65).required(),
    email: joi.string().min(3).max(254).email().required(),
    password: joi.string().min(8).max(500).required(),
  });

  return schema.validate(data);
};

const login = (data) => {
  const schema = joi.object({
    usernameOrEmail: joi.string().min(3).max(254).required(),
    password: joi.string().min(8).max(500).required(),
  });

  return schema.validate(data);
};

const passwordReset = (data) => {
  const schema = joi.object({
    password: joi.string().min(8).max(500).required(),
    newPassword: joi
      .string()
      .min(3)
      .max(254)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
      .required(),
  });

  return schema.validate(data);
};

const userInfo = (data) => {
  const schema = joi.object({
    username: joi
      .string()
      .min(6)
      .max(36)
      .regex(/^[a-zA-Z0-9._-]+$/)
      .optional(),
    phone_number: joi
      .string()
      .regex(/^\d{10}$/)
      .optional(),
    address: joi
      .string()
      .regex(/^[a-zA-Z0-9\s,'-]*$/)
      .optional(),
  });

  return schema.validate(data);
};

module.exports = {
  register,
  login,
  passwordReset,
  userInfo,
};
