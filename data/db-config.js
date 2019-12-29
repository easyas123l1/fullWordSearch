const knex = require("knex");

const environment = process.env.environment

const config = require("../knexfile.js");

module.exports = knex(config.development);
