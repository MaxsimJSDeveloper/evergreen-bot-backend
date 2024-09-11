import Joi from 'joi';
import JoiPhoneNumber from 'joi-phone-number';

const JoiExtended = Joi.extend(JoiPhoneNumber);

export const registerUserSchema = JoiExtended.object({
  name: Joi.string().min(3).max(30).required(),
  phone: JoiExtended.string().phoneNumber().required(),
  city: Joi.string().optional(),
  email: Joi.string().optional(),
});

export const loginUserSchema = JoiExtended.object({
  phone: JoiExtended.string().phoneNumber().required(),
});

export const updateUserSchema = JoiExtended.object({
  name: Joi.string().min(3).max(30),
  phone: JoiExtended.string().phoneNumber(),
  city: Joi.string().optional(),
  email: Joi.string().optional(),
});
