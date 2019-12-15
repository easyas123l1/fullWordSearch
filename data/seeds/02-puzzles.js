exports.seed = function(knex) {
  return knex("puzzles").insert([
    { id: 1, name: "puzzle1", code: "abcd", description: "", user_id: 1 },
    { id: 2, name: "puzzle2", code: "efgh", description: "", user_id: 1 },
    { id: 3, name: "puzzle3", code: "ijkl", description: "", user_id: 1 },
    { id: 4, name: "puzzle4", code: "mnop", description: "", user_id: 1 },
    { id: 5, name: "puzzle5", code: "qrst", description: "", user_id: 2 },
    { id: 6, name: "puzzle6", code: "uvwx", description: "", user_id: 3 }
  ]);
};
