import Joi from 'joi';

export const orderSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required',
  }),
  price: Joi.string().required().messages({
    'string.base': 'Price must be a string',
    'any.required': 'Price is required',
  }),
  service: Joi.string().required().messages({
    'string.base': 'Service must be a string',
    'any.required': 'Service is required',
  }),
});
