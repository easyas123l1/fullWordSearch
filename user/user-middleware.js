const Users = require("./user-model.js");

module.exports = {
  validRegLog,
  createUser,
  validateUserId
};

async function validRegLog(req, res, next) {
  let user = req.body;

  if (!user.username) {
    next({
      status: 400,
      message: "Missing username"
    });
  }

  if (!user.password) {
    next({
      status: 400,
      message: "Missing password"
    });
  }
  next();
}

async function createUser(req, res, next) {
  let user = req.body;
  req.body.created = Date.now();
  if (!user.role_id) {
    req.body.role_id = 1;
  }
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  let validId = Number(id);
  if (!Number.isInteger(validId) && validId > 0) {
    next({ message: "Invalid user id" });
  }
  Users.getUser({ id: validId })
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next({ message: "Could not find user with given id", status: 404 });
      }
    })
    .catch(next);
}
