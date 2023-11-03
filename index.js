const express = require('express');
const bodyParser = require('body-parser');
const productsJson = require('./sampleProducts.json');

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`App live at http://localhost:${port}/`));

app.get('/', (req, res) => {
    res.render("index.ejs")
});

app.get("/submit", (req, res) => {
  // Get the barcode from the query string
  const barcode = req.query.barcode;
  // Perform a search on the productsJson object
  const product = productsJson.products.find((product) => product.barcode == barcode);

  if (product) {
    res.render("product.ejs", { product })
  }
  else {
    console.log("Product not found")
  }
})