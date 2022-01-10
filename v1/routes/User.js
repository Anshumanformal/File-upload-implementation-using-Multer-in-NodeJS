const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'user'),
    // destination: path.join(__dirname, "public", "uploads", "user")/* + "/public/uploads/user"*/,
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

/*
Note:-
In order to separate files into folders, we need to find the user based upon token/email etc. Then apply that
logic to create the filename above. Everything depends on the fieldname provided from the frontend.

var assign = multer.diskStorage({
 destination:function(req,file,cb){
const dir=’./public/uploads/’+file.fieldname;
if(file.fieldname === “Assign1”){
  cb(null,dir);
 }else if(file.fieldname===”Assign2"){
  cb(null,dir);
 }else if(file.fieldname===”Assign3"){
  cb(null,dir);
 }else if(file.fieldname===”Assign4"){
  cb(null,dir);
 }else if(file.fieldname===”Assign5"){
  cb(null,dir);
 }
 },
 filename: function(req,file,cb){
 cb(null,file.originalname)
 }
})
var upload = multer({storage:assign});

*/

const upload = multer({ storage });
const Controller = require("../controllers");

router.post("/uploadImage", upload.single("image"), Controller.UserController.uploadImage);

module.exports = router;