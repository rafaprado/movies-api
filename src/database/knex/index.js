const knex = require("knex");
const knexFile = require("../../../knexfile");

const connection = knex(knexFile.development);

module.exports = connection;