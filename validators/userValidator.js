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
        "o campo 'name' é obrigatorio e debe ter 3 caracateres como min e un maximo de 15",
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
    .min(0)
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
const editUserSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .error(
      generateError(
        "o campo 'name' é obrigatorio e debe ter 3 caracateres como min e un maximo de 15",
        400
      )
    ),
  email: Joi.string()
    .email()
    .required()
    .error(generateError("debe introducir un email válido", 400)),

  bio: Joi.string()
    .max(500)
    .error(
      generateError("a biografia non pode ter mais de 500 caracteres", 400)
    ),
});

const changeUserPasswordSchema = Joi.object().keys({
  currentPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError("debe introducir password de 8 dixitos como min", 400)
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError("debe introducir password de 8 dixitos como min", 400)
    ),
});

const recoveryUserPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError("O campo email, debe conter un campo email válido", 400)
    ),
});

const resetUserPasswordSchema = Joi.object().keys({
  recoverCode: Joi.string()
    .length(40)
    .required()
    .error(
      generateError(
        "O campo recoverCode é obrigatorio e debe contar con 40 caracteres",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "O campo newPassword é obrigatorio e debe ter unha lonxitude minima de 8 caracteres",
        400
      )
    ),
});

module.exports = {
  newUserSchema,
  loginUserSchema,
  recoveryUserPasswordSchema,
  resetUserPasswordSchema,
  editUserSchema,
  changeUserPasswordSchema,
};
