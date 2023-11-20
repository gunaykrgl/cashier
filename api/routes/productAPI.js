var express = require('express');
var router = express.Router();
var db = require("../database/productDatabase.js");


//! Change this with an actual mysql database
let productsList = [
  { "name": "demo", "quantity": "2", "price": "5", "barcode": 123456789012 },
  { "name": "example", "quantity": "3", "price": "7", "barcode": 987654321012 },
  { "name": "sample", "quantity": "1", "price": "10", "barcode": 567890123456 }
]

router.get("/", function(req, res, next) {
  res.send("API is working properly");
})

router.get("/getProductsList", function(req, res, next) {
  res.send(productsList)
})



router.get("/api/products", (req, res, next) => {
  var sql = "select * from product"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});


module.exports = router;
