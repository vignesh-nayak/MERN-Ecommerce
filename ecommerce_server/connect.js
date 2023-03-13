const mongoose = require('mongoose');

// funtion to connect to mongodb
const connectMongoDB = async () => {
    mongoose.set('strictQuery', true);
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        if (process.env.NODE_ENV === 'development') console.log(`connected ${connection.connection.host}`);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.log(`error:${error}`);
        process.exit();
    }
}

module.exports = connectMongoDB;