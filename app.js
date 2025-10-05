const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
app.use(bodyParser.json());
const connectDB = require('./db');
const Product = require('./models/Product');

connectDB();

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, price: 1, category: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
    const productData = deletedProduct.toObject();
    delete productData.__v;
    res.json({ message: "Product Deleted" ,
        Product: productData
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
