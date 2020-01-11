const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./user-model.js");
const { validRegLog } = require("./user-middleware");
const restricted = require("../auth/restricted-middleware");

router.post("/register", validRegLog, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json({ message: "Account created succesfully!" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error while adding user" });
    });
});

router.post("/login", validRegLog, (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        user.password = undefined;

        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, user, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials Login" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server crashed while trying to login" });
    });
});

// update user info
router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;

  Users.update(id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "server crashed while trying to update user" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: "you can checkout any time you like, but you can never leave"
        });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: "never was logged in" });
  }
});

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: `1h`
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
