const { generateError } = require("../helpers/generateError");
const { getConnection } = require("./db");
const uuid = require("uuid");
const randomString = require("randomstring");

const createUser = async (name, email, password, bio = "") => {
  let connection;
  try {
    connection = await getConnection();
    const [existingUser] = await connection.query(
      "SELECT id FROM users WHERE email=?",
      [email]
    );

    if (existingUser.length > 0) {
      throw generateError("xa existe un usuario con ese email", 409);
    }

    const registrationCode = uuid.v4();

    const [result] = await connection.query(
      "INSERT  INTO users(name,email,password,bio,registrationCode) VALUES(?,?,?,?,?)",
      [name, email, password, bio, registrationCode]
    );

    return {
      userId: result.insertId,
      registrationCode: registrationCode,
    };
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getUserByActivationCode = async (registrationCode) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      "SELECT id FROM users WHERE registrationCode=?;",
      [registrationCode]
    );
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getUserById = async (id) => {
  try {
    connection = await getConnection();
    const [results] = await connection.query(
      "SELECT * FROM users WHERE id=?;",
      [id]
    );
    return results[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      "SELECT id,password,active FROM users WHERE email=?;",
      [email]
    );
    return result[0];
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const activateUser = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      "UPDATE users SET active=true,registrationCode=NULL WHERE id=?;",
      [id]
    );
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createUserAvatar = async (userId, url) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      "INSERT INTO users_images(user_id,url)VALUES(?,?);",
      [userId, url]
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const updateUserRecoverCode = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const recoverCode = randomString.generate(40);

    await connection.query(
      `
      UPDATE users
      SET passwordUpdateCode=?
      WHERE email=?
    `,
      [recoverCode, email]
    );

    return recoverCode;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getUserByRecoverCode = async (code) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE passwordUpdateCode = ?
    `,
      [code]
    );

    return result[0];
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const changeUserPassword = async (userId, newPassword) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE users
      SET password = ?, passwordUpdateCode = NULL
      WHERE id = ?
    `,
      [newPassword, userId]
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createUser,
  getUserByActivationCode,
  activateUser,
  createUserAvatar,
  getUserById,
  getUserByEmail,
  updateUserRecoverCode,
  changeUserPassword,
  getUserByRecoverCode,
};
