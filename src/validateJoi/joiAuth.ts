import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

export default loginSchema;
