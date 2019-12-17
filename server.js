const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const ApiRouter = require("./api/api-router.js");
const WordRouter = require("./words/word-router.js");
const PuzzleRouter = require("./puzzles/puzzle-router.js");

const server = express();

const sessionConfig = {
  name: "secret", //sid
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production!
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false //GDPR laws against setting cookies automatically
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("tiny"));
server.use(session(sessionConfig));

server.use("/puzzles", PuzzleRouter);
server.use("/words", WordRouter);

server.use("/api", ApiRouter);

// server sanity check
server.use("/", (req, res) => {
  res.status(200).json("server is running!");
});

module.exports = server;
