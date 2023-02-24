const mongoose = require('mongoose');

// funtion to connect to mongodb
const connectMongoDB = async () => {
    mongoose.set('strictQuery', true);
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected ${connection.connection.host}`);
    } catch (error) {
        console.log(`error:${error}`);
        process.exit();
    }
}

module.exports = connectMongoDB;