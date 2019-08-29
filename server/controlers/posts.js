const database = require('../database');

exports.getAll = (req, res) => {
  database
    // .query(`SELECT * FROM post WHERE id_group = '${req.query.id_group}'`)
    .query(`SELECT * FROM post LEFT JOIN ticher ON post.id_account = ticher.id_account where id_group = 1;`)
    .then(row => {
        console.log('row by select : ', row)
      res.json(row);
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
};
exports.save = (req, res) => {
    database
      // .query(`SELECT * FROM post WHERE id_group = '${req.query.id_group}'`)
      .query(`insert into post (content,id_group,id_account, date_created)
      values ('${req.body.content}',${req.body.id_group}, ${req.body.id_account},'${new Date(req.body.date_created).toISOString().slice(0, 19).replace('T', ' ')}');`)
      .then(row => {
          console.log('post zapisano pomyślnie')
      })
      .catch(err => {
        console.log(err);
      });
  };
