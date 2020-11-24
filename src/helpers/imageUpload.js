const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: 'src/public/images',
    filename: (req, file, cb) => { 
        const ext = path.parse(file.originalname).ext;
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage });

exports.imageUpload = upload.single('avatar');