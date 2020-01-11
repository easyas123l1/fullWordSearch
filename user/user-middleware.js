module.exports = {
  validRegLog,
  createUser
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
