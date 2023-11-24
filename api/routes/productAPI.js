var express = require('express');
var router = express.Router();
var db = require("../dbHandlers/productDatabase.js");


router.get("/", function(req, res, next) {
  res.send("API is working properly");
})

router.get("/getProductsList", function(req, res, next) {
  // Use db.all to perform the database query
  db.all('SELECT * FROM product', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the result as JSON to the client
    res.json(rows);
  });
});


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
