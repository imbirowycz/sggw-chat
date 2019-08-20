const database = require('../database');
const jwt = require('jsonwebtoken');
const secret = require('./secret');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    database
      .query(
        `SELECT * FROM account WHERE email = '${email}' AND password = '${password}'`
      )
      .then(rows => {
        if (rows.length > 0) {
          let token = jwt.sign({id: rows[0].id_account}, secret.secret, {
            expiresIn: 86400,
          }); // expires in 24 hours
          if (
            rows[0].accountType == 'students' ||
            rows[0].accountType == 'ticher'
          ) {
            database
              .query(
                `SELECT * FROM ${rows[0].accountType} WHERE id_account = ${
                  rows[0].id_account
                }`
              )
              .then(user => {
                res.status(200).json({auth: true, token: token, user: user[0]});
                res.end();
              });
          } else {
            res.json({firstName: 'root', lastName: 'admin'});
            res.end();
          }
        } else {
          res.status(401).send({
            error: 'Incorrect email or password!',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(401).send('Please enter Email and Password!');
    res.end();
  }
};
exports.logout = (req, res) => {
  //TODO
  database
    .query(
      `INSERT INTO token (token, dateCreated) value ('${
        req.headers.token
      }', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`
    )
    .then(row => {
      res
        .status(401)
        .send({auth: false, message: 'Failed to authenticate token!'});
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
};
exports.init = (req, res) => {
  //TODO
  res.json('auth ok :)');
};

