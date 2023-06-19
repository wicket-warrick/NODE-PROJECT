require("dotenv").config();

const cors = require("cors");

const morgan = require("morgan");
const fileUpLoad = require("express-fileupload");
const express = require("express");
const chalk = require("chalk");

const { authUser } = require("./middlewares/authUser");

const {
  createUserController,
} = require("./controllers/users/createUserController");

const {
  loginUserController,
} = require("./controllers/users/loginUserController");

const {
  validateUserController,
} = require("./controllers/users/validateUserController");

const uploadAvatarUserController = require("./controllers/users/uploadAvatarUserController");

const {
  createNewController,
} = require("./controllers/news/createNewController");

const {
  deleteNewController,
} = require("./controllers/news/deleteNewController");

const { editNew, getNewsBeforeToday } = require("./db/news");

const { editNewController } = require("./controllers/news/editNewController");

const {
  getNewsByTopicController,
} = require("./controllers/news/listNewsByTopicController");

const {
  listNewsBeforeTodayController,
} = require("./controllers/news/listNewsBeforeTodayController");

const uploadPhotoNewController = require("./controllers/news/uploadPhotoNewsController");

const {
  listPhotosInNewController,
} = require("./controllers/news/listPhotosInNewController");

const {
  deleteNewPhotoController,
} = require("./controllers/news/deleteNewPhotoController");

const { voteNewController } = require("./controllers/news/voteNewController");

const {
  listLastNewsByVotesController,
} = require("./controllers/news/listLastNewsByVotesController");
const { recoveryUserPasswordSchema } = require("./validators/userValidator");
const recoveryUserPasswordController = require("./controllers/users/recoveryUserPasswordController");
const resetUserPasswordController = require("./controllers/users/resetUserPasswordController");
const {
  editUserController,
} = require("./controllers/users/editUserController");
const {
  changeUserPasswordController,
} = require("./controllers/users/changeUserPassword");
const {
  deleteUserController,
} = require("./controllers/users/deleteUserController");
const {
  deleteUseAvatarController,
} = require("./controllers/users/deleteUserAvatarController");
const listNewsController = require("./controllers/news/listNewsController");
const newByIdController = require("./controllers/news/newByIdController");
const getUserByIdController = require("./controllers/users/getUserByIdController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpLoad());
app.use("/uploads", express.static("./uploads"));
app.use("/avatar", express.static("./avatar"));

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.post("/user", createUserController);

app.get("/user/:idUser", getUserByIdController);

app.post("/user/login", loginUserController);

app.get("/user/validate/:registrationCode", validateUserController);

app.post("/user/:idUser(\\d+)/avatar", authUser, uploadAvatarUserController);

app.put("/user/:idUser(\\d+)/password", authUser, changeUserPasswordController);

app.put("/user/:idUser(\\d+)", authUser, editUserController);

app.delete("/user/:idUser(\\d+)", authUser, deleteUserController);

app.delete(
  "/user/:idUser(\\d+)/avatar/:idAvatar",
  authUser,
  deleteUseAvatarController
);

app.post("/new", authUser, createNewController);

app.put("/new/:idNew(\\d+)", authUser, editNewController);

app.delete("/new/:idNew(\\d+)", authUser, deleteNewController);

app.get("/news/votes/", listLastNewsByVotesController);

app.get("/news/:idNew", newByIdController);
app.get("/news", listNewsController);

app.post("/new/:idNew(\\d+)/photo", authUser, uploadPhotoNewController);

app.delete(
  "/new/:idNew(\\d+)/photos/:idPhoto",
  authUser,
  deleteNewPhotoController
);

app.get("/new/:idNew(\\d+)/photo", listPhotosInNewController);

app.post("/new/:idNew(\\d+)/vote", authUser, voteNewController);

app.post("/user/recoverypassword", recoveryUserPasswordController);

app.post("/user/resetpassword", resetUserPasswordController);

app.use((req, res) => {
  res.statusCode = 404;
  res.send({
    status: "error",
    message: "Not found",
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

// const { API_PORT, API_HOST } = process.env;
const API_PORT=process.env.PORT || 3000
// console.log(API_PORT)
app.listen(API_PORT, () => {
  console.log(
    chalk.black.bgWhite.bold(`API funcionando en puerto ${API_PORT}`)
  );
});
