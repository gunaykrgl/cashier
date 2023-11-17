var express = require('express');
var router = express.Router();

//! Change this with an actual mysql database
let productsList = [
  { "name": "demo", "quantity": "2", "price": "5", "barcode": "123456789012" },
  { "name": "example", "quantity": "3", "price": "7", "barcode": "987654321012" },
  { "name": "sample", "quantity": "1", "price": "10", "barcode": "567890123456" }
]

let Cart = []

router.get("/", function(req, res, next) {
    console.log("Barcode form")
    res.send("Barcode form")
})

router.get("/cart", function(req, res, next) {
  res.send(Cart)
})

router.post("/addToCart", function(req, res, next) {
  barcode = req.body.barcode
  const filtered_list = productsList.filter(product => {
    return product.barcode == barcode
  })
  if (filtered_list.length != 0) {
    Cart.push({...filtered_list[0], quantity: 1})
  }
})

module.exports = router;