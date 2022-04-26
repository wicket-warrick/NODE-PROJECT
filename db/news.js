const { createAndEditNewSchema } = require("../validators/newValidator.js");
const { getConnection } = require("./db.js");

const createNew = async (authorId, title, description, entradilla, topic) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      "INSERT INTO news(user_id,title,description,entradilla,topic)VALUES(?,?,?,?,?);",
      [authorId, title, description, entradilla, topic]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteNew = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [selectedNew] = await connection.query(
      "SELECT id FROM news WHERE id = ?;",
      [id]
    );

    if (selectedNew.length === 0) {
      throw generateError(`A notica con id: ${id} non existe.`, 404);
    }

    await connection.query("DELETE FROM news WHERE id = ?;", [id]);
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getNewById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.query(
      "SELECT * FROM news WHERE id = ?;",
      [id]
    );

    return results[0];
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const editNew = async (id, title, description, entradilla, topic) => {
  let connection;

  try {
    connection = await getConnection();

    const [currentNew] = await connection.query(
      "SELECT * FROM news WHERE id = ?;",
      [id]
    );

    if (currentNew.length === 0) {
      throw generateError(`Noticia con id: ${id} no existe.`, 404);
    }

    if (title === "") {
      title = currentNew[0].title;
    }

    if (!description) {
      console.log(description, "description");
      description = currentNew[0].description;
      console.log(description, "description");
    }

    if (!entradilla) {
      entradilla = currentNew[0].entradilla;
    }

    if (!topic) {
      console.log(topic, "topic");
      topic = currentNew[0].topic;
      console.log(topic, "topic");
    }
    console.log(title, "titulo");
    const newData = {
      title,
      description,
      entradilla,
      topic,
    };
    await createAndEditNewSchema.validateAsync(newData);

    await connection.query(
      "UPDATE news SET title = ?, description = ?, entradilla = ?, topic = ? WHERE id = ?;",
      [title, description, entradilla, topic, id]
    );
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { createNew, deleteNew, getNewById, editNew };
