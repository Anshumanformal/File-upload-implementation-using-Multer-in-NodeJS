const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const userstorage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'user'),
    // destination: path.join(__dirname, "public", "uploads", "user")/* + "/public/uploads/user"*/,
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

const adminStorage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'admin'),
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

const superAdminStorage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'superAdmin'),
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

const vendorStorage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'vendor'),
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

const allStorage = multer.diskStorage({
    destination: path.resolve('public', 'uploads', 'ImageByName'),
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        // Either provide the image from frontend by user/admin etc... or give static name.
        const filename = "user_" + Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});

/*
Note:-
In order to separate file types(like image, document etc..) into folders, we need to find the user based upon token/email etc. Then apply that
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


/*
For separating files based on filetype -> apply check on mimetype
*/

const uploadUser = multer({ storage: userstorage });
const uploadAdmin = multer({ storage: adminStorage });
const uploadSuperAdmin = multer({ storage: superAdminStorage });
const uploadVendor = multer({ storage: vendorStorage });
const uploadArrayOfImages = multer({ storage: allStorage });
const Controller = require("../controllers");

router.post("/uploadImage", uploadUser.single("image"), Controller.UserController.uploadImage);
router.post("/uploadAdminImage", uploadAdmin.single("image"), Controller.UserController.uploadImage);
router.post("/uploadSuperAdminImage", uploadSuperAdmin.single("image"), Controller.UserController.uploadImage);
router.post("/uploadVendorImage", uploadVendor.single("image"), Controller.UserController.uploadImage);

router.post("/uploadArrayOfImages", uploadArrayOfImages.fields([
    { name: 'userImage', maxCount: 1 },
    { name: 'adminImage', maxCount: 1 },
    { name: 'superAdminImage', maxCount: 1 },
    { name: 'vendorImage', maxCount: 1 }
]), Controller.UserController.uploadArrayOfImages);

module.exports = router;