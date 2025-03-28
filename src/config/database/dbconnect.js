const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book_store'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
<<<<<<< HEAD
  console.log('Connected to the database as id', connection.threadId);
=======
>>>>>>> 40bcc426c69195d0e67bbdb63def64dc681468ae
});

module.exports = connection;
