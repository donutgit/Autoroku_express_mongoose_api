var express = require("express");
var router = express.Router();
// const path = require("path");
// var cloudinary = require("cloudinary");
// var formidable = require("formidable");

//Cloudinary config
// cloudinary.config({
//   cloud_name: "dxfogjj18",
//   api_key: "114254235712369",
//   api_secret: "t8pR8g4BukaIqc_-pOCYNDPc5u4"
// });

router.post("/", function(req, res) {
  console.log(req.body);
});


module.exports = router;
