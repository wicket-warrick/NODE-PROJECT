const Joi = require("joi");
const { generateError } = require("../helpers/generateError");

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError(
        "debe introducir un email válido e unha password de 8 dixitos como min",
        400
      )
    ),

  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .error(
      generateError(
        "o campo 'name' é obrigatorio e debe ter 3 caracateres como min",
        400
      )
    ),
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "debe introducir un email válido e unha password de 8 dixitos como min",
        400
      )
    ),
  bio: Joi.string()
    .max(500)
    .error(
      generateError("a biografia non pode ter mais de 500 caracteres", 400)
    ),
});
const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(generateError("debe introducir un email válido", 400)),

  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError("debe introducir password de 8 dixitos como min", 400)
    ),
});

module.exports = { newUserSchema, loginUserSchema };
