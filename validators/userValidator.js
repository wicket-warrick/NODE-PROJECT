const Joi = require("joi");
const { generateError } = require("../helpers/generateError");

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError(
        "El campo 'email' es obligatorio.Por favor, introduzca un email válido.",
        400
      )
    ),

  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .error(
      generateError(
        "El campo 'Nombre de usuario' es obligatorio y debe contener 3 caracteres com mínimo y 15 como máximo.",
        400
      )
    ),
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo 'password' es obligatorio.Por favor, introduzca un password de 8 caracteres como mínimo.",
        400
      )
    ),
  bio: Joi.string()
    .min(0)
    .max(500)
    .error(
      generateError(
        "El campo 'Biografía' no puede tener más de 500 caracteres.",
        400
      )
    ),
});
const loginUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError("Por favor introduzca un password e email válido.", 400)
    ),

  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError("Por favor introduzca un password e email válido.", 400)
    ),
});
const editUserSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .error(
      generateError(
        "El campo 'Nombre de usuario' es obligatorio y debe contener 3 caracteres com mínimo y 15 como máximo.",
        400
      )
    ),
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError(
        "El campo 'email' es obligatorio.Por favor, introduzca un email válido.",
        400
      )
    ),

  bio: Joi.string()
    .max(500)
    .error(
      generateError(
        "El campo 'Biografía' no puede tener más de 500 caracteres.",
        400
      )
    ),
});

const changeUserPasswordSchema = Joi.object().keys({
  currentPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo 'password' es obligatorio.Por favor, introduzca un password de 8 caracteres como mínimo.",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo 'password' es obligatorio.Por favor, introduzca un password de 8 caracteres como mínimo.",
        400
      )
    ),
});

const recoveryUserPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(
      generateError(
        "El campo 'email' es obligatorio.Por favor, introduzca un email válido.",
        400
      )
    ),
});

const resetUserPasswordSchema = Joi.object().keys({
  recoverCode: Joi.string()
    .length(40)
    .required()
    .error(
      generateError(
        "El campo 'recover code' es obligatorio.Por favor, consulte la bandeja de entrada, de la cuenta de email vinculado a su perfil.",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo 'new  password' es obligatorio.Por favor, introduzca un password de 8 caracteres como mínimo.",
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
