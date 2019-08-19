import {
  degressList,
  scientificsList,
  facultysList,
  fieldsOfStudy,
  years,
} from './mockApi';

const getDepress = function() {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(degressList);
    }, 500);
  });
};
const getScientifics = function() {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(scientificsList);
    }, 500);
  });
};
const getFacultys = function() {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(facultysList);
    }, 500);
  });
};
const getFieldsOfStudy = function() {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(fieldsOfStudy);
    }, 500);
  });
};
const getYears = function() {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(years);
    }, 500);
  });
};
const createUser = function () {
  return new Promise ((resolve, rejects) => {
    setTimeout(() => {
      resolve("Konto zostało pomyślenie utworzone. Proszę się zalogować.")
    }, 500)
  })
}
export {getDepress, getScientifics, getFacultys, getFieldsOfStudy, getYears, createUser};
