module.exports = {
  validRegLog
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
