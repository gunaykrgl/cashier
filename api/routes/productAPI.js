var express = require('express');
var router = express.Router();
var db = require("../dbHandlers/productDatabase.js");


router.get("/", function (req, res, next) {
  res.send("Product API");
})

router.get("/getProductsList", function (req, res, next) {
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

router.get("/getProduct", (req, res, next) => {
  const barcode = req.query.barcode
  const sql = "SELECT * FROM product WHERE barcode = ?"
  const params = [barcode]
  db.all(sql, params, (err, rows) => {
    console.log(rows, rows.length === 0)
    if (rows.length === 0) {
      res.json({ message: "No Product with given barcode" })
    }
    else {
      res.json({
        message: "Success",
        data: rows
      })
    }
  })
})


module.exports = router;
