import mysql from 'mysql2/promise';

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const database = process.env.DATABASE_URL;
  const connection = mysql.createConnection(database);
  
  global.connection = connection;

  console.log('Database is connected!');

  return connection;
}

export default connect;
