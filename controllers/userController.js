const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();
const userModel = new UserModel();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (userModel.getUserByEmail(email)) {
    return res
      .status(400)
      .json({ message: "Пользователь с таким email уже существует" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при хешировании пароля" });
    }

    userModel.createUser(email, hash);

    return res
      .status(201)
      .json({ message: "Пользователь успешно зарегистрирован" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Неправильные учетные данные" });
  }

  if (userModel.isMailCh(email)) {
    return res
      .status(403)
      .json({ message: "Доступ запрещен для @mail.ch адресов" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Неправильный пароль" });
    }

    const token = jsonwebtoken.sign({ email: user.email }, "your-secret-key");
    res.json({ message: "Успешная аутентификация", token });
  });
});

router.post("/logout", authenticateUser, (req, res) => {
  // Разрушение токена
  const newToken = ""; // Пустой токен

  // нужно удалять токен из cookies или локального хранилища на клиенте
  res.json({ message: "Выход выполнен", token: newToken });
});

router.delete("/delete", authenticateUser, (req, res) => {
  const { email } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  if (user.email === req.user.email) {
    return res.status(403).json({ message: "Вы не можете удалить свою учетную запись" });
  }

  const deleted = userModel.deleteUserByEmail(email);
  if (deleted) {
    // Разрушение токена
    res.json({ message: "Пользователь успешно удален" });
  } else {
    return res.status(500).json({ message: "Ошибка при удалении пользователя" });
  }
});


module.exports = router;
