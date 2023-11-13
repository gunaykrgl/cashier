var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("/")
  res.send('respond with a resource');
});

router.get("/getAllProducts", function(req, res, next) {
  res.send("Get all products")
})
router.get("/barcode", (req, res, next) => {console.log("gwega")})

module.exports = router;
