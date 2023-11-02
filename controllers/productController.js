const express = require("express");
const Product = require("./../models/productsModel");

const messages = require("./../messages");
const { productNotFoundMessage } = messages.productController;

const router = express.Router();
const productModel = new Product();

router.get("/", (req, res) => {
  const products = productModel.getAllProducts();
  res.json({ products, status: 200 });
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const product = productModel.getProductById(id);
  if (product) {
    res.json({ product, status: 200 });
  } else {
    res.status(404).json({ message: productNotFoundMessage, status: 404 });
  }
});

module.exports = router;
