const express = require("express");
const helmet = require("helmet");

const WordRouter = require("./words/word-router.js");
const PuzzleRouter = require("./puzzles/puzzle-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

// server sanity check
server.use("/puzzles", PuzzleRouter);
server.use("/words", WordRouter);

server.use("/", (req, res) => {
  res.status(200).json("server is running!");
});

module.exports = server;
