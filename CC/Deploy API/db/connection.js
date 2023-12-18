const mysql = require('mysql');

const dbConfig = {
  host: '34.128.96.128',
  user: 'capstone',
  password: 'capstone',
  database: 'capstone'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

module.exports = connection;
