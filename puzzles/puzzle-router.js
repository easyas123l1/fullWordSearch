const express = require("express");

const Puzzles = require("./puzzle-model.js");

const router = express.Router();

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

module.exports = router;
