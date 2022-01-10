
module.exports.uploadImage = async(req, res, next) => {
    try {
       
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


