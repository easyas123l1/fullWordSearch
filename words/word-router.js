const express = require("express");

const Words = require("./word-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Words.getWords()
    .then(words => {
      res.status(200).json(words);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get words" });
    });
});

module.exports = router;
