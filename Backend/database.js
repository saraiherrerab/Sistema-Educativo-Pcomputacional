const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:admin@localhost:5432/base_de_datos_prueba_sarai');

module.exports =  db;