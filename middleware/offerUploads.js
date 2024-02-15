const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'storage/offerImages/');
    },
    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        const p_id = req.body.p_id;
        console.log(p_id);
        const now = Date.now() || 0;
        cb(null, `${p_id}${now}${extension}`);
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
}).single('offerImage');

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during upload
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            // An unknown error occurred during upload
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        // No errors occurred during upload
        next();
    });
};