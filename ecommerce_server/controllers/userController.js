const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const helper = require('../helper');

const createNewUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword, isAdmin = false } = req.body;

        if (!userName || !userEmail || !userPassword) {
            res.send({
                error: 'Fill all fields',
                statusCode: 400
            })
            return;
        }

        const user = await User.findOne({ email: userEmail });
        if (user) {
            res.send({
                error: 'User already exist.',
                statusCode: 400
            })
            return;
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userPassword, salt);

        const userObject = {
            name: userName,
            email: userEmail,
            password: hashPassword,
            isAdmin
        }

        await User.create(userObject)
            .then(data => res.send({
                message: `data added for ${data.email}`,
                user: data,
                statusCode: 200
            }))
            .catch(error => res.send({
                error: `error while adding ${userObject.email}, error: ${error}`,
                statusCode: 500
            }))

    }
    catch (err) {
        res.send({
            err,
            statusCode: 500
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (user) {
            res.send({ user: user, statusCode: 200 });
            return;
        }
        res.send({ message: 'Invalid credentials', statusCode: 400 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const getUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ email: userEmail }).select('-createdAt,-updatedAt'); // not sure

        const isPasswordMatching = await bcrypt.compare(userPassword, user.password);

        if (isPasswordMatching) {
            res.send({ user: user, statusCode: 200 });
            return;
        }
        res.send({ message: 'Invalid credentials', statusCode: 400 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const updateUserName = async (req, res) => {
    try {
        const { userEmail } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (user === null) {
            res.send({ message: `${userEmail} not found`, statusCode: 400 });
            return;
        }

        const { userName = user.name } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            {
                $set: {
                    name: userName,
                }
            }
        );

        res.send({ user: updatedUser, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }

}

const updateUserPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (user === null) {
            res.send({ message: `${userEmail} not found`, statusCode: 400 });
            return;
        }

        const { userPassword = user.password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userPassword, salt);

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            {
                $set: {
                    name: hashPassword,
                }
            }
        );

        res.send({ user: updatedUser, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }

}

const updateUserPermission = async (req, res) => {
    try {
        const { userEmail } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (user === null) {
            res.send({ message: `${userEmail} not found`, statusCode: 400 });
            return;
        }

        const { isAdmin = user.isAdmin } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            {
                $set: {
                    isAdmin
                }
            }
        );

        res.send({ user: updatedUser, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        if (users.length === 0) {
            res.send({ message: 'No user found', statusCode: 200 });
            return;
        }

        res.send({ users: users, statusCode: 200 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const deleteUser = async (req, res) => {
    const email = req.body.userEmail;
    try {
        await Product.deleteOne({ email: email });
        res.json({ message: `user-${email} deleted successfully`, statusCode: 200 });
    } catch (error) {
        res.json({ message: `user-${email} was not able delete`, error: error, statusCode: 500 });
    }

}

const searchUser = async (req, res) => {
    try {
        const query = req.body.string;
        const users = await User.find({
            $or: [
                { "name": { '$regex': query } },
                { "email": { '$regex': query } },
            ]
        });

        if (users.length === 0) {
            res.send({ message: `No product not found`, statusCode: 200 });
            return;
        }

        res.send({ users: users, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (isPasswordMatching) {
            const userObject = {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: helper.generateToken(user._id),
            }
            res.send({ user: userObject, statusCode: 200 });
        }
        else {
            res.send({ message: 'Invalid credentials.', statusCode: 400 });
        }
    } catch (error) {
        res.send({ error: error, statusCode: 500 });
    }
}

const changePassword = async (req, res) => {
    res.send({ message: 'not build yet.' })
}
// except one user and admin
const deleteAllUsers = async (req, res) => {
    res.send({ message: 'not build yet.' })
}

module.exports = {
    createNewUser,
    getUser,
    updateUserName,
    updateUserPassword,
    updateUserPermission,
    getAllUsers,
    deleteUser,
    searchUser,
    login,
    changePassword,
    getUserById,
    deleteAllUsers
}