const configDB = {
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: 'Globus24.',
  database: 'sggwDB',
  charset: 'utf8mb4',
};
const database = require('./classes/database')(configDB);
database.query('SET CHARACTER SET utf8mb4');
module.exports = database;
