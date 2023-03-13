const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, require: true, default: false }
    },
    {
        collection: 'userData',
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;