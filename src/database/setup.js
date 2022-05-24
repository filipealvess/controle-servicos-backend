import mysql from 'mysql2/promise';

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });
  
  global.connection = connection;

  console.log('Database is connected!');

  return connection;
}

export default connect;
