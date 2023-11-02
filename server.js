const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");

require('./updateProducts');

const app = express();

app.use(bodyParser.json());

app.use("/user", userController);

// Загрузка данных о продуктах из JSON-файлов
const products = require("./db/products.json");

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


// Запуск сервера
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
