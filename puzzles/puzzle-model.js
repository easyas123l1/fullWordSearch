const db = require("../data/db-config.js");

module.exports = {
  getPuzzles
};

function getPuzzles() {
  return db("puzzles");
}
