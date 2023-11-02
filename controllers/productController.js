const express = require("express");
const Product = require("./../models/productsModel");

const router = express.Router();
const productModel = new Product();

router.get("/", (req, res) => {
  const products = productModel.getAllProducts();
  res.json(products);
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = productModel.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Продукт не найден", status: 404 });
  }
});

module.exports = router;
