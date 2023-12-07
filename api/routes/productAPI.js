const { Router } = require('express');
const { join } = require("path");

const router = Router();
const config = require("../config.js");
const db = require(join(config.projectRoot, "db", "Handlers", "productDatabase.js"));

router.get("/", function (req, res, next) {
  res.send("Product API");
})

// Get all products
router.get("/getProductsList", async (req, res, next) => {
  try {
    const rows = await db.getProducts()
    res.json(rows)
  }
  catch (err){
    console.log(err)
  }

});


// Get Product by barcode
router.get("/getProduct", async (req, res) => {
  const barcode = req.query.barcode;
  console.log(barcode);
  try {
    const rows = await db.getProduct(barcode);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;