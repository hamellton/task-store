const fs = require("fs");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");

const updateProductsFromCSV = (callback) => {
    const results = [];

    fs.createReadStream("db/products.csv")
      .pipe(csv())
      .on("data", (data) => {
        // преобразование данные из CSV в нужный формат JSON
        const product = {
          id: uuidv4(),
          sku: data.SKU,
          description: data.Description,
          cpt: parseInt(data.CPT),
          jhb: parseInt(data.JHB),
          dbn: parseInt(data.DBN),
          "totalStock": parseInt(data["Total Stock"]),
          "dealerPrice": parseFloat(data["Dealer Price"]),
          "retailPrice": parseFloat(data["Retail Price"]),
          manufacturer: data.Manufacturer,
          "imageURL": data["Image URL"],
          "category": "test",
        };

        results.push(product);
      })
      .on("end", () => {
        // Обновление данных в JSON-файле
        fs.writeFileSync("db/products.json", JSON.stringify(results, null, 2));

        if (callback) {
          callback();
        }
      });
}

module.exports = {
  updateProductsFromCSV
}