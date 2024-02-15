const multer = require('multer');
const path = require('path');
const sizeOf = require('image-size'); // Import image-size for image dimensions

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/propertyImages/');
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const p_id = req.body.p_id;
        const now = Date.now() || 0;
        const compressedFilename = `${p_id}${now}_compressed${extension}`;
        cb(null, compressedFilename);
    },
});

const fileFilter = (req, file, cb) => {
    // file extension filter
    const validExt = ['.png', '.jpg', '.jpeg'];
    if (!validExt.includes(path.extname(file.originalname))) {
        return cb(new Error('only .png, .jpg, .jpeg are allowed'));
    }

    // file size filtering
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 10 * 1024 * 1024) {
        return cb(new Error('file size is too big (max: 10MB)'));
    }

    cb(null, true);
};

// Middleware to compress the image using image-size before saving to disk
// const compressAndSave = (req, res, next) => {
//     if (!req.file) {
//         return next(); // No file to compress, move on to the next middleware
//     }

//     try {
//         const dimensions = sizeOf(req.file.buffer);
//         const aspectRatio = dimensions.width / dimensions.height;

//         // Set your desired width (e.g., 800 pixels) and calculate the height to maintain aspect ratio
//         const width = 800;
//         const height = Math.round(width / aspectRatio);

//         // Resize the image using Buffer
//         const resizedBuffer = sharp(req.file.buffer)
//             .resize(width, height)
//             .toBuffer();

//         // Update the original buffer with the resized buffer
//         req.file.buffer = resizedBuffer;
//         next();
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// };

// Configure multer with the updated storage and fileFilter
let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
}).single('propertyImage');

module.exports = { upload};
