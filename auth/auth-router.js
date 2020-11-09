const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/model");
const newToken = require("./token");
const { validateUser } = require("../users/validation");

router.post("/register", (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user);
  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then((saved) => {
        const token = newToken(saved);
        res.status(201).json(token);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error adding user", err });
      });
  } else {
    res.status(400).json({ Message: "User not valid", errors: validateUser(user) });
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
