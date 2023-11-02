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
      .json({ message: "Пользователь с таким email уже существует", status: 400 });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при хешировании пароля", status: 500 });
    }

    userModel.createUser(email, hash);

    return res
      .status(201)
      .json({ message: "Пользователь успешно зарегистрирован", status: 201 });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Неправильные учетные данные", status: 401 });
  }

  if (userModel.isMailCh(email)) {
    return res
      .status(403)
      .json({ message: "Доступ запрещен для @mail.ch адресов", status: 403 });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Неправильный пароль", status: 401 });
    }

    const token = jsonwebtoken.sign({ email: user.email }, "your-secret-key");
    res.json({ message: "Успешная аутентификация", token, status: 200 });
  });
});

router.post("/logout", authenticateUser, (req, res) => {
  // Разрушение токена
  const newToken = "";

  // нужно удалять токен из cookies или локального хранилища на клиенте
  res.json({ message: "Выход выполнен", token: newToken, status: 200 });
});

router.delete("/delete", authenticateUser, (req, res) => {
  const { email } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден", status: 404 });
  }

  if (user.email === req.user.email) {
    return res.status(403).json({ message: "Вы не можете удалить свою учетную запись", status: 403 });
  }

  const deleted = userModel.deleteUserByEmail(email);
  if (deleted) {
    // Разрушение токена
    res.json({ message: "Пользователь успешно удален", status: 200 });
  } else {
    return res.status(500).json({ message: "Ошибка при удалении пользователя", status: 500 });
  }
});


module.exports = router;
