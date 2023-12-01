var express = require('express');
var router = express.Router();
var db = require("../db/Handlers/productDatabase"); 

router.get("/", function (req, res, next) {
  res.send("Product API");
})

router.get("/getProductsList", async function (req, res, next) {
  try {
    const rows = await db.getProducts()
    res.json(rows)
  }
  catch (err){
    console.log(err)
  }

});

router.get("/getProduct", async (req, res, next) => {
  const barcode = req.query.barcode
  try {
    const rows = await db.getProduct(barcode)
    res.send(rows)
  }
  catch {
    console.log("some error")
  }
})


module.exports = router;
