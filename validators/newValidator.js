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
        "El campo 'Título' es obligatorio y tiene una longitud máxima de 50 caracteres. ",
        400
      )
    ),
  description: Joi.string()
    .min(50)
    .max(800)
    .required()
    .error(
      generateError(
        "El campo 'Noticia' es obligatorio y tiene una longitud mínima de 50 caracteres y máxima de 800.",
        400
      )
    ),
  entradilla: Joi.string()
    .min(15)
    .max(100)
    .optional()
    .allow("", null)
    .error(
      generateError(
        "El campo 'Entradilla' es obligatorio y tiene una longitud mínima de 15 caracteres y máxima de 100.",
        400
      )
    ),
  topic: Joi.string()
    .valid(...topics)
    .required()
    .error(
      generateError(
        `El campo 'Topic' es obligatorio. Las opciones disponibles son:${topics}`,
        400
      )
    ),
});

module.exports = {
  createAndEditNewSchema,
  topics,
};
