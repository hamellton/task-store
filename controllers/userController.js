const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const router = express.Router();
const userModel = new UserModel();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (userModel.getUserByEmail(email)) {
    return res.status(400).json({ message: "Пользователь с таким email уже существует" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при хешировании пароля" });
    }

    userModel.createUser(email, hash);

    return res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Неправильные учетные данные" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Неправильный пароль" });
    }

    const token = jsonwebtoken.sign({ email: user.email }, "your-secret-key");
    res.json({ message: "Успешная аутентификация", token });
  });
});

router.post("/logout", (req, res) => {
  // Разрушение токена, если необходимо
  res.json({ message: "Выход выполнен" });
});

module.exports = router;
