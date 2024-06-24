import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  city: Joi.string().required(),
  zipCode: Joi.string().pattern(new RegExp("^[0-9]{5}$")).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  age: Joi.number().integer().min(0),
  city: Joi.string(),
  zipCode: Joi.string().pattern(new RegExp("^[0-9]{5}$")),
}).min(1);
