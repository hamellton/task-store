const fs = require("fs");

const productsFilePath = "./db/products.json";

class ProductModel {
  constructor() {
    this.products = this.loadProductsFromJson();
  }

  loadProductsFromJson() {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }
}

module.exports = ProductModel;
