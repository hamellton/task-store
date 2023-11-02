const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const { updateProductsFromCSV } = require("./updateProducts");

const server = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use("/api", userRoutes);
  app.use("/api", productRoutes);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
};

updateProductsFromCSV(server);
