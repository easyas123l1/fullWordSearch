const db = require("../data/db-config.js");

module.exports = {
  getWords
};

function getWords() {
  return db("words");
}
