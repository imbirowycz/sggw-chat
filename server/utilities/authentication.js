const jwt = require('jsonwebtoken');
const secret = require('./secret')
const database = require('../database');

module.exports = function (req, res, next) {
    console.log('authentication');
    let bool = false;
    let token = req.headers.token;
    if (token) {
       database
        .query(`SELECT * FROM token WHERE token = '${token}'`)
        .then(row => {
          if (row.length > 0) bool = true;
          if (!bool) {
            jwt.verify(token, secret, function(err) {
              if (err) {
                res
                  .status(401)
                  .send({auth: false, message: 'Failed to authenticate token!'});
              } else {
                next();
              }
            });
          } else {
            res.status(401).send({auth: false, message: 'No token!'});
          }
        });
    } else {
      res.status(401).send({auth: false, message: 'No token!'});
    }
  };
