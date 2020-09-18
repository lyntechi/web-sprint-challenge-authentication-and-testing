const bcryptjs = require("bcryptjs");
const router = require("express").Router();

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash;
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
