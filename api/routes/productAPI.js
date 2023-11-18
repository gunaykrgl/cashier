var express = require('express');
var router = express.Router();

//! Change this with an actual mysql database
let productsList = [
  { "name": "demo", "quantity": "2", "price": "5", "barcode": 123456789012 },
  { "name": "example", "quantity": "3", "price": "7", "barcode": 987654321012 },
  { "name": "sample", "quantity": "1", "price": "10", "barcode": 567890123456 }
]

router.get("/getProductsList", function(req, res, next) {
  res.send(productsList)
})


module.exports = router;
