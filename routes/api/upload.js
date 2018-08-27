var express = require("express");
var router = express.Router();
// const path = require("path");
var cloudinary = require("cloudinary");
var formidable = require("formidable");

//Cloudinary config
cloudinary.config({
  cloud_name: "dxfogjj18",
  api_key: "114254235712369",
  api_secret: "t8pR8g4BukaIqc_-pOCYNDPc5u4"
});

router.post("/", function(req, res) {
  // console.log(req);
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files.image.path);
    cloudinary.uploader.upload(files.image.path, function(result) {
      res.send(result);
    });
  });
});

// WORKING CLOUDINARY
// router.post("/", function(req, res) {
//   console.log("[FILE]", req.files);
//   cloudinary.v2.uploader
//     .upload_stream(result => console.log(result))
//     .end(req.files.sampleFile.data);
// });

// router.post("/", function(req, res) {
//   if (!req.files) return res.status(400).send("No files were uploaded.");

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   // let sampleFile = req.files.sampleFile;
//   // sampleFile.mv().then(res1 => console.log(res1))
//   console.log(req.files);
//   //LOCAL
//   // Use the mv() method to place the file somewhere on your server
//   // sampleFile.mv(path.resolve(`./public/images/${sampleFile.name}`), function(err) {
//   //   if (err)
//   //     return res.status(500).send(err);

//   //   res.send('File uploaded!');
//   // });

//   //CLOUDINARY
//   cloudinary.uploader.upload(req.files.sampleFile.path, (error, result) => {
//     console.log(result, error);
//   });
// });

module.exports = router;
