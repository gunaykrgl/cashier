const express = require('express');
const router = express.Router();

router.get("/", function(req, res, next) {
    console.log("Barcode form")
    res.send("Barcode form")
})

router.post("/finalize", function(req, res, next) {
  cart = req.body
  console.log(cart)
})

module.exports = router;