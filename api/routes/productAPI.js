var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/getAllProducts", function(req, res, next) {
  res.send("Get all products")
})

module.exports = router;
