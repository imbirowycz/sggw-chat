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
        console.log('row login: ', rows)
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
exports.register = (req, res) => {
  console.log(req.body)
  let accountType = req.body.accountType;
  let role = null
  if (accountType == 'ticher') role = 2
  else if (accountType == 'students') role = 3
  else role = 4
  database.query(`INSERT INTO account (id_role, email, password, accountType) value(${role}, '${req.body.email}', '${req.body.password}', '${accountType}') `).then(row => {
    console.log("row: ", row)
    if (accountType == "ticher") {
      database.query(`INSERT INTO ticher (id_account, email, degree, firstName, lastName, faculty) value (${row.insertId}, '${req.body.email}', '${req.body.degree}', '${req.body.firstName}', '${req.body.lastName}', 'wydzial nauk o zwierzetach')`)
    } else if (accountType == "students") { 
  
      database.query(`SELECT * FROM groups where year = '${req.body.year}' and fieldOfStudy = '${req.body.fieldOfStudy}' and mode = '${req.body.mode}' and degree = '${req.body.degree}';`).then(group => {
        if (group.length < 1) database.query(`INSERT INTO groups (year,fieldOfStudy, mode, degree) value('${req.body.year}','${req.body.fieldOfStudy}','${req.body.mode}', '${req.body.degree}')`).then(id => {
          console.log('if id_group: ', id.insertId);
          database.query(`INSERT INTO students (id_account,id_group, email, degree, firstName, lastName, fieldOfStudy, mode, numberAl, year) value (${row.insertId}, ${id.insertId},'${req.body.email}', '${req.body.degree}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.fieldOfStudy}', '${req.body.mode}', '${req.body.numberAl}', '${req.body.year}')`);
        })
        else {
          console.log('else id_group: ', group[0].id_group);
          database.query(`INSERT INTO students (id_account,id_group, email, degree, firstName, lastName, fieldOfStudy, mode, numberAl, year) value (${row.insertId}, ${group[0].id_group},'${req.body.email}', '${req.body.degree}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.fieldOfStudy}', '${req.body.mode}', '${req.body.numberAl}', '${req.body.year}')`);
        }
        })
    } else {
      //TODO add account admin
      }
      
    })
  //TODO
  res.json('auth ok :)');
};

