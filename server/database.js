const configDB = {
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: 'Globus24.',
    database: 'sggwDB',
  };
  const database = require('./classes/database')(configDB);
  module.exports = database;

  
  