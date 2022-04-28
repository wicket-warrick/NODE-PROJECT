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
    .error(generateError("O campo title é obigatorio ", 400)),
  description: Joi.string()
    .min(50)
    .max(800)
    .required()
    .error(
      generateError("campo obrgatrio e extension maxima 800 caracteres", 400)
    ),
  entradilla: Joi.string()
    .min(15)
    .max(100)
    .optional()
    .error(
      generateError("Extension mínima de 15 caracteres e maxima 100 ", 400)
    ),
  topic: Joi.string()
    .valid(...topics)
    .error(
      generateError(
        `Este campo é obrigatorio e debe estar contido dentro de esta lista:${topics}`,
        400
      )
    ),
});

module.exports = {
  createAndEditNewSchema,
  topics,
};
