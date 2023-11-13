var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    console.log("Barcode form")
    res.send("Barcode form")
})

router.get("/lookup", function(req, res, next) {
  res.send("Barcode lookup")
  console.log("Barcode lookup")
  console.log(req.query.barcode)
})

module.exports = router;