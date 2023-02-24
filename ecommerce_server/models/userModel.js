const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// add default shippping address.

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

userSchema.method.matchPassword = async (userPassword) => {
    return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;