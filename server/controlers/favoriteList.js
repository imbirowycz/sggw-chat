const database = require('../database');

exports.getAll = async (req, res) => {
//   let groups = await getAllGroups();
console.log(req.query)
let arr = []
if (req.query.type == 'students') {
    arr = await getAllPerson(req.query.id_account);
} else if (req.query.type == 'ticher') {
    let groups = await getAllGroups(req.query.id_account);
    let persons = await getAllPerson(req.query.id_account);
    arr = [...groups, ...persons];
} else {
    res.json('Nie rozpoznany typ!');
    res.end();
    return;
}
  res.json(arr);
  res.end();

};

function getAllGroups(id) {
  return new Promise((res, rej) => {
    database
      .query(
        `
    select * from listOfLikes 
    LEFT JOIN groups ON listOfLikes.id_friend = groups.id_group
    WHERE listOfLikes.id_account = ${id} and listOfLikes.type = 'group';`
      )
      .then(row => {
        res(row);
        console.log(row);
      });
  });
}
function getAllPerson(id) {
  return new Promise((res, rej) => {
    database
     .query(
        `select * from listOfLikes
      LEFT JOIN students ON listOfLikes.id_friend = students.id_account
      WHERE listOfLikes.id_account = ${id} and listOfLikes.type = 'person';`
      )
      .then(row => {
        res(row);
        console.log(row);
      });
  });
}
