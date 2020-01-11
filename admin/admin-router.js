const router = require("express").Router();

const Admin = require("./admin-model.js");
const restricted = require("../auth/restricted-middleware");

// get all users restricted!
router.get("/", restricted, (req, res) => {
  Admin.getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get users" });
    });
});

module.exports = router;
