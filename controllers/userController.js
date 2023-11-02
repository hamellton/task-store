const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const authenticateUser = require("../middleware/authMiddleware");

const messages = require("./../messages");

const router = express.Router();
const userModel = new UserModel();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (userModel.getUserByEmail(email)) {
    return res
      .status(400)
      .json({ message: messages.existingUserMessage, status: 400 });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: messages.hashErrorMessage, status: 500 });
    }

    userModel.createUser(email, hash);

    return res
      .status(201)
      .json({ message: messages.authenticationSuccessMessage, status: 201 });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: messages.invalidCredentialsMessage, status: 401 });
  }

  if (userModel.isMailCh(email)) {
    return res
      .status(403)
      .json({ message: messages.mailChAccessDeniedMessage, status: 403 });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: messages.invalidCredentialsMessage, status: 401 });
    }

    const token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({ message: messages.authenticationSuccessMessage, token, status: 200 });
  });
});

router.post("/logout", authenticateUser, (req, res) => {
  const newToken = "";

  res.json({ message: messages.logoutSuccessMessage, token: newToken, status: 200 });
});

router.delete("/delete", authenticateUser, (req, res) => {
  const { email } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: messages.deleteUserNotFoundMessage, status: 404 });
  }

  if (user.email === req.user.email) {
    return res.status(403).json({ message: messages.deleteOwnAccountMessage, status: 403 });
  }

  const deleted = userModel.deleteUserByEmail(email);
  if (deleted) {
    res.json({ message: messages.deleteSuccessMessage, status: 200 });
  } else {
    return res.status(500).json({ message: messages.deleteUserErrorMessage, status: 500 });
  }
});


module.exports = router;
