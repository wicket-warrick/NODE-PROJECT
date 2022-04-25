const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const sendgrid = require("@sendgrid/mail");

const generateError = (message, code = 500) => {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
};

module.exports = { generateError };
