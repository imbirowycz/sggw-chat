const configDB = {
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: 'Globus24.',
  database: 'sggwDB',
  charset: 'utf8'
};
const database = require('./classes/database')(configDB);
database.query('SET NAMES utf8mb4;');
// database.query("SET CHARSET utf8mb4");
// database.query("SET NAMES `utf8mb4` COLLATE `utf8mb4_unicode_ci`");
module.exports = database;
