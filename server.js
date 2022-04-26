require("dotenv").config();

// const authUser = require("./middlewares/authUser.js");
const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const {
  createUserController,
} = require("./controllers/users/createUserController");
const {
  loginUserController,
} = require("./controllers/users/loginUserController");
const {
  validateUserController,
} = require("./controllers/users/validateUserController");
const { authUser } = require("./middlewares/authUser");
const {
  createNewController,
} = require("./controllers/news/createNewController");
const {
  deleteNewController,
} = require("./controllers/news/deleteNewController");
const { editNew } = require("./db/news");
const { editNewController } = require("./controllers/news/editNewController");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpLoad());
// app.use(
//   cors({
//     origin: ["http://mipaginaweb.es", "https://mipaginaweb.es"],
//   })
// );

app.post("/users", createUserController);

app.post("/users/login", loginUserController);

app.get("/users/validate/:registrationCode", validateUserController);

app.post("/new", authUser, createNewController);

app.put("/new/:idNew(\\d+)", authUser, editNewController);

app.delete("/new/:idNew(\\d+)", authUser, deleteNewController);

app.use((req, res) => {
  res.statusCode = 404;
  res.send({
    status: "error",
    message: "not found",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.statusCode = error.httpStatus || 500;
  res.send({
    status: "error",
    message: error.message,
  });
});

const { API_PORT, API_HOST } = process.env;
app.listen(API_PORT, () => {
  console.log(
    chalk.black.bgWhite.bold(`API funcionando en ${API_HOST}:${API_PORT}`)
  );
});
