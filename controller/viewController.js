var express = require("express");
var router = express.Router();
// var axios = require('axios');
// const client = axios.create();

router.get("/", function (req, res) {
  res.render("index");
});

module.exports = router;
