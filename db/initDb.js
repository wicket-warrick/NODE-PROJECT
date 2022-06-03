require("dotenv").config();

const { getConnection } = require("./db");

async function main() {
  let connection;

  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borrar las tablas si existen
    console.log("Borrando tablas");
    await connection.query("DROP TABLE IF EXISTS news_votes");
    await connection.query("DROP TABLE IF EXISTS news_images");
    await connection.query("DROP TABLE IF EXISTS users_images");
    await connection.query("DROP TABLE IF EXISTS news");
    await connection.query("DROP TABLE IF EXISTS users");

    // Crear las tablas de nuevo
    console.log("Creando tablas");
    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        active BOOLEAN DEFAULT false,
        registrationCode VARCHAR(100),
        passwordUpdateCode VARCHAR(100),
        bio TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE news (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        entradilla VARCHAR(200),
        topic ENUM('politica','espana','deportes','tecnologia','viajes','salud','economia','entretenimiento','internacional','galicia'),
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)  ON DELETE SET NULL
      );
    `);

    await connection.query(`
      CREATE TABLE news_images (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        new_id INTEGER ,
        url VARCHAR(100),
        FOREIGN KEY (new_id) REFERENCES news (id)  ON DELETE SET NULL
      )
    `);

    await connection.query(`
      CREATE TABLE users_images (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER ,
        url VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES users (id)  ON DELETE SET NULL
      )
    `);

    await connection.query(`
      CREATE TABLE news_votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER,
        new_id INTEGER,
        FOREIGN KEY (new_id) REFERENCES news (id) ON DELETE SET NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
      )
    `);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Traballo feito, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
