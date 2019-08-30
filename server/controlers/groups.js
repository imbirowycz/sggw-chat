const database = require('../database');

exports.getAll = (req, res) => {
  database
    // .query(`SELECT * FROM post WHERE id_group = '${req.query.id_group}'`)
    .query(`SELECT * FROM groups;`)
    .then(row => {
        // console.log('row by select : ', row)
      res.json(row);
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
};