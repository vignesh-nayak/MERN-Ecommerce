const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const checkAuthorization = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);

            req.user = await User.findById(decoded._id).select('-password');
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
            Error: error,
            statusCode: 500
        })
    }
}

module.exports = {
    checkAuthorization,
}