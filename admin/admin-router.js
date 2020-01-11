const router = require("express").Router();

const Admin = require("./admin-model.js");

// get all users restricted!
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

module.exports = router;