import Joi from 'joi';

interface user_obj {
  [name: string]: string | number | boolean;
}
export const validateUserSignUp = (user: user_obj) => {
  const schema = {
    firstname: Joi.string().min(2).max(100).required(),
    lastname: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(1).max(254).email().required(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(user, schema);
};
