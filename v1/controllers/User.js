
module.exports.uploadImage = async(req, res, next) => {
    try {
        // Here, we receive file in req.file object.
       
        if(!req.file) throw new Error("ERROR_WHILE_UPLOADING");
        console.log(req.file);

        const newPath = req.file.path.split("public").pop();
        const fullImageBaseURLPath = process.env.BASE_URL + newPath;
        
        res.json({
            success: true,
            message : "IMAGE UPLOADED SUCCUSSFULLY",
            fullImageBaseURLPath
        })

    } catch (error) {
        next(error);
    }
}


module.exports.uploadArrayOfImages = async(req, res, next) => {
    try {
       
        // Here, we receive files in req.files object.

        if(!req.files) throw new Error("ERROR_WHILE_UPLOADING");
        // console.log('req.files=====>>>>>>>', req.files);

        let newPath = [];

        req.files.userImage.forEach((item) => {
            return newPath.push(item.path.split("public").pop());
        })
        req.files.adminImage.forEach((item) => {
            return newPath.push(item.path.split("public").pop());
        })
        req.files.superAdminImage.forEach((item) => {
            return newPath.push(item.path.split("public").pop());
        })
        req.files.superAdminImage.forEach((item) => {
            return newPath.push(item.path.split("public").pop());
        })
        
        // const newPath = req.file.path.split("public").pop();
        // const fullImageBaseURLPath = process.env.BASE_URL + newPath;
        let fullImageBaseURLPath = [];
        fullImageBaseURLPath = newPath.map((item) =>{
            return process.env.BASE_URL + item;
        })
        
        res.json({
            success: true,
            message : "IMAGE UPLOADED SUCCUSSFULLY",
            fullImageBaseURLPath
        })

    } catch (error) {
        next(error);
    }
}
