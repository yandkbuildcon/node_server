const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'storage/adminProfilePic/');
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        const c_id = req.body.c_id;
        console.log(ad_id);
        cb(null, `${ad_id}${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    // file extension filter
    const validExt = ['.png', '.jpg', '.jpeg'];
    if (!validExt.includes(path.extname(file.originalname))) {
        return cb(new Error("only .png, .jpg, .jpeg are allowed"));
    }

    // file size filtering
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 10 * 1024 * 1024) {
        return cb(new Error("file size is too big (max: 10MB)"));
    }

    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

module.exports = upload;
