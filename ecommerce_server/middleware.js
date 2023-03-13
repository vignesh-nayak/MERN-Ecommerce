const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const multer = require('multer');
const dataUriParser = require('datauri/parser.js');
const path = require('path');
const cloudinary = require('cloudinary');

const checkAuthorization = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        else {
            res.send({
                message: 'Not authorized',
                statusCode: 400
            })
        }
    } catch (error) {
        res.send({
            error: error,
            statusCode: 500
        })
    }
}

const uploadSingleToMulter = () => {
    const storage = multer.memoryStorage();
    return multer({ storage }).single("file");
}

const uploadSingleToCloudinary = async (file) => {
    const parser = new dataUriParser();
    const extname = path.extname(file.originalName).toString();
    const filePath = parser.format(extname, file.buffer);

    await cloudinary.uploader.upload(filePath.content, { public_id: CLOUDINARY_PUBLIC_ID })

    return cloudinary.url(CLOUDINARY_PUBLIC_ID, {
        width: 100,
        height: 150,
        Crop: 'fill'
    });
}

module.exports = {
    checkAuthorization,
    uploadSingleToMulter,
    uploadSingleToCloudinary
}