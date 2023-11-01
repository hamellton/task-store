const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const userController = require("./controllers/userController");

require('./updateProducts');

const app = express();

app.use(bodyParser.json());

app.use("/users", userController);

// Загрузка данных о пользователях и продуктах из JSON-файлов
const users = require("./db/users.json");
const products = require("./db/products.json");

app.use("/users", userController);

// Функция для проверки электронной почты на @mail.ch
const isMailCh = (email) => {
  return email.endsWith("@mail.ch");
}

// Middleware для проверки аутентификации
const authenticateUser = (req, res, next) => {
  // Получить данные пользователя из запроса (например, токен)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Не авторизован" });
  }

  try {
    // Проверка и верификация токена
    const user = jsonwebtoken.verify(token, "your-secret-key");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Ошибка аутентификации" });
  }
}

// 3c. Получение списка продуктов с фильтрацией по категории
app.get('/products', (req, res) => {
  const { category } = req.query;

  // Если указана категория, фильтруйте продукты
  if (category) {
    const filteredProducts = products.filter((product) => product.category === category);
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});


// 3d. Получение информации о продукте по его ID
app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Продукт не найден" });
  }

  res.json(product);
});

// Получение списка категорий продуктов
app.get('/categories', (req, res) => {
  // Извлеките уникальные категории из списка продуктов
  const categories = [...new Set(products.map((product) => product.category))];
  res.json(categories);
});


// 3e. Загрузка пользователей в базу данных (предполагается, что данные пользователей хранятся в JSON-файле)

// Функция для генерации уникального ID для пользователя
// const generateUniqueUserId = () => {
//   return uuidv4();
// }

// // 3a. Аутентификация пользователя по электронной почте и паролю
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(401).json({ message: "Неправильные учетные данные" });
//   }

//   if (isMailCh(email)) {
//     return res
//       .status(403)
//       .json({ message: "Доступ запрещен для @mail.ch адресов" });
//   }

//   // Сравнение введенного пароля с хешем, хранящимся в базе данных
//   bcrypt.compare(password, user.password, (err, result) => {
//     if (err || !result) {
//       return res.status(401).json({ message: "Неправильный пароль" });
//     }

//     // Создание JWT токена
//     const token = jsonwebtoken.sign({ email: user.email }, "your-secret-key");
//     res.json({ message: "Успешная аутентификация", token });
//   });
// });


// // 3b. Выход
// app.post("/logout", authenticateUser, (req, res) => {
//   // Разрушение токена, если необходимо
//   res.json({ message: "Выход выполнен" });
// });

// // 4. Регистрация новых пользователей
// app.post("/register", (req, res) => {
//   const { email, password } = req.body;

//   const existingUser = users.find((user) => user.email === email);

//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: "Пользователь с таким email уже существует" });
//   }

//   // Используйте bcrypt для хеширования пароля
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({ message: "Ошибка при хешировании пароля" });
//     }

//     const newUser = {
//       id: generateUniqueUserId(),
//       email,
//       password: hash, // Сохраняем хэшированный пароль
//     };

//     users.push(newUser);

//     // Сохранение обновленных данных в users.json
//     const jsonUsers = JSON.stringify(users, null, 2);
//     fs.writeFileSync("./db/users.json", jsonUsers);

//     return res
//       .status(201)
//       .json({ message: "Пользователь успешно зарегистрирован" });
//   });
// });


// Запуск сервера
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
