const { required } = require("joi");
const Joi = require("joi");
const { generateError } = require("../helpers/generateError");
const topics = [
  "politica",
  "espana",
  "deportes",
  "tecnologia",
  "viajes",
  "salud",
  "economia",
  "entretenimiento",
  "internacional",
  "galicia",
];
const createAndEditNewSchema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(50)
    .required()
    .error(
      generateError(
        "O campo title é obigatorio, e ten un máximo de 50 caracteres ",
        400
      )
    ),
  description: Joi.string()
    .min(50)
    .max(800)
    .required()
    .error(
      generateError(
        "O campo 'description' é obrgatrio e extension mínima de 50 caracteres e maxima de 800",
        400
      )
    ),
  entradilla: Joi.string()
    .min(0)
    .max(100)
    .error(
      generateError(
        "A entradilla debe ter un mínimo de 15 caracteres  e maxima 100 ",
        400
      )
    ),
  topic: Joi.string()
    .valid(...topics)
    .required()
    .error(
      generateError(
        `O campo 'topic' é obrigatorio e debe estar contido dentro de esta lista:${topics}`,
        400
      )
    ),
});

module.exports = {
  createAndEditNewSchema,
  topics,
};
