const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./api-model.js");
const restricted = require("../auth/restricted-middleware");

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json({ message: `Welcome ${user.username}!` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error while adding user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        const token = generateToken(user);
        const id = user.id;
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, token, id });
      } else {
        res.status(401).json({ message: "Invalid Credentials Login" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server crashed while trying to login" });
    });
});
``;
// get all users
router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get users" });
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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  const secret = process.env.JWT_SECRET || "secret";
  const result = jwt.sign(payload, secret, options);

  return result;
}

module.exports = router;
