exports.seed = function(knex) {
  return knex("words").insert([
    { id: 1, word: "apple", puzzle_id: 1 },
    { id: 2, word: "red", puzzle_id: 1 },
    { id: 3, word: "strange", puzzle_id: 1 },
    { id: 4, word: "things", puzzle_id: 1 },
    { id: 5, word: "are", puzzle_id: 1 },
    { id: 6, word: "happening", puzzle_id: 2 },
    { id: 7, word: "how", puzzle_id: 2 },
    { id: 8, word: "many", puzzle_id: 2 },
    { id: 9, word: "really", puzzle_id: 2 },
    { id: 10, word: "can", puzzle_id: 3 },
    { id: 11, word: "we", puzzle_id: 4 },
    { id: 12, word: "just", puzzle_id: 4 },
    { id: 13, word: "addi", puzzle_id: 4 },
    { id: 14, word: "cry", puzzle_id: 5 },
    { id: 15, word: "cam", puzzle_id: 5 },
    { id: 16, word: "car", puzzle_id: 5 },
    { id: 17, word: "truck", puzzle_id: 5 },
    { id: 18, word: "dive", puzzle_id: 6 },
    { id: 19, word: "deer", puzzle_id: 6 },
    { id: 20, word: "halo", puzzle_id: 6 },
    { id: 21, word: "over", puzzle_id: 6 }
  ]);
};
