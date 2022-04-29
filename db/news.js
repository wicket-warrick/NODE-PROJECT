const { generateError } = require("../helpers/generateError.js");
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

const editNew = async (id, title, description, entradilla, topic) => {
  let connection;

  try {
    connection = await getConnection();

    const [currentNew] = await connection.query(
      "SELECT * FROM news WHERE id = ?;",
      [id]
    );

    if (currentNew.length === 0) {
      throw generateError(`A noticia co ID: ${id} non existe.`, 404);
    }

    if (title === "") {
      title = currentNew[0].title;
    }

    if (!description) {
      description = currentNew[0].description;
    }

    if (!entradilla) {
      entradilla = currentNew[0].entradilla;
    }

    if (!topic) {
      topic = currentNew[0].topic;
    }

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

const deleteNew = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [selectedNew] = await connection.query(
      "SELECT id FROM news WHERE id = ?;",
      [id]
    );

    if (selectedNew.length === 0) {
      throw generateError(`A notica con ID: ${id} non existe.`, 404);
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

const getNewsByTopic = async (topic) => {
  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.query(
      "SELECT title,entradilla,user_id as author,createdAt FROM news WHERE topic = ? ORDER BY modifiedAt DESC;",
      [topic]
    );

    return results;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getNewsBeforeToday = async (modifiedAt) => {
  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.query(
      "SELECT  title,entradilla,user_id as author ,modifiedAt FROM news WHERE modifiedAt < ?",
      [modifiedAt]
    );

    return results;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getLastNewsOrderByVotes = async (modifiedAt) => {
  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.query(
      "SELECT title,entradilla,id ,COUNT(new_id) AS votes FROM news n LEFT JOIN news_votes nv ON n.id=nv.new_id  WHERE modifiedAt < ? GROUP BY n.id ORDER BY COUNT(new_id) DESC ;",
      [modifiedAt]
    ); //cambio o primeiro Count (*) por Count(new_id) AS votes, tal e como dixo Samo tras a titoria

    return results;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createNewPhoto = async (newId, url) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query("INSERT INTO news_images(new_id,url)VALUES(?,?);", [
      newId,
      url,
    ]);
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deletePhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query("DELETE FROM news_images WHERE id = ?;", [id]);
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getPhotosInNew = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const result = connection.query(
      "SELECT id, url FROM news_images WHERE new_id = ?",
      [id]
    );

    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getNewPhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [results] = await connection.query(
      "SELECT id, url FROM news_images WHERE id = ?;",
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

const voteNew = async (userId, newId) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      "INSERT INTO news_votes(user_id,new_id)VALUES(?,?);",
      [userId, newId]
    );
  } catch (error) {
    if (error.errno === 1062) {
      throw generateError(
        "Xa votaches esta noticia, so podes votar unha vez cada noticia",
        400
      );
    } else {
      throw error;
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createNew,
  deleteNew,
  getNewById,
  editNew,
  getNewsByTopic,
  getNewsBeforeToday,
  createNewPhoto,
  getNewPhotoById,
  getPhotosInNew,
  deletePhotoById,
  voteNew,
  getLastNewsOrderByVotes,
};
