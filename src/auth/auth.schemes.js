const Joi = require('joi');

exports.registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
