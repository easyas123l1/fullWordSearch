const router = require("express").Router();

const Puzzles = require("./puzzle-model.js");

// get all puzzles
router.get("/", (req, res) => {
  Puzzles.getPuzzles()
    .then(puzzles => {
      res.status(200).json(puzzles);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get puzzles" });
    });
});

// add puzzle and words
router.post("/", (req, res) => {
  console.log(req.token.user);
  let { name, code, description, words } = req.body;
  let newObj = {
    name,
    code,
    description,
    user_id: req.token.user.id
  };
  console.log(newObj);
  Puzzles.addPuzzle(newObj)
    .then(id => {
      for (let word of words) {
        let newObj2 = {
          word,
          puzzle_id: id
        };
        Puzzles.addWords(newObj2);
      }
      getPuzzle(id).then(puzzle => {
        Puzzles.getWords(id).then(puzWords => {
          console.log(puzzle, puzWords);
          res.status(200).json(puzzle, puzWords);
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to add puzzle" });
    });
});

module.exports = router;
