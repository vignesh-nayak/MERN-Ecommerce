require('dotenv').config();
const express = require("express");
const connectMongoDB = require('./connect');
const cors = require('cors');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const { checkAuthorization } = require('./middleware');
// const { uploadSingleToMulter } = require('./middleware');
const cloudinary = require('cloudinary');

connectMongoDB();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/api', checkAuthorization, (req, res) => res.send({ message: 'Backend is running successfully....' }));

// userRouter
app.post("/api/user/create", (req, res) => userController.createNewUser(req, res));
app.post("/api/user/login", (req, res) => userController.login(req, res));
app.post("/api/user/forgotPassword", (req, res) => userController.forgotPassword(req, res));
app.get("/api/user/getUser", checkAuthorization, (req, res) => userController.getUser(req, res));
app.get("/api/user/:userId", checkAuthorization, (req, res) => userController.getUserById(req, res));
app.post("/api/user/updateName", checkAuthorization, (req, res) => userController.updateUserName(req, res));
app.post("/api/user/updatePassword", checkAuthorization, (req, res) => userController.updateUserPassword(req, res));
app.post("/api/user/updatePermission", checkAuthorization, (req, res) => userController.updateUserPermission(req, res));
app.get("/api/user/all", checkAuthorization, (req, res) => userController.getAllUsers(req, res));
app.delete("/api/user/delete", checkAuthorization, (req, res) => userController.deleteUser(req, res));
app.get("/api/user/search", checkAuthorization, (req, res) => userController.searchUser(req, res));

// productRouter
app.get("/api/product/all", (req, res) => productController.getAllProducts(req, res));
app.get("/api/product/:id", (req, res) => productController.getProductById(req, res));
app.post("/api/product/create", checkAuthorization, (req, res) => productController.createNewProduct(req, res));
// app.post("/api/product/create",checkAuthorization, uploadSingleToMulter, (req, res) => productController.createNewProduct(req, res));
app.delete("/api/product/delete", checkAuthorization, (req, res) => productController.deleteProduct(req, res));
app.get("/api/product/search/:string", (req, res) => productController.searchProduct(req, res));
app.post("/api/product/:id", checkAuthorization, (req, res) => productController.updateProduct(req, res));
app.post("/api/product/:id/addReview", checkAuthorization, (req, res) => productController.addProductReview(req, res));

// orderRouter
app.post("/api/order/create", checkAuthorization, (req, res) => orderController.createNewOrder(req, res));
app.get("/api/order/all", checkAuthorization, (req, res) => orderController.getAllOrders(req, res));
app.get("/api/order/userOrders/:userId", checkAuthorization, (req, res) => orderController.getOrdersOfUser(req, res));
app.delete("/api/order/delete", checkAuthorization, (req, res) => orderController.deleteAllOrders(req, res));
app.get("/api/order/:id", checkAuthorization, (req, res) => orderController.getOrderbyId(req, res));
app.post("/api/order/:id", checkAuthorization, (req, res) => orderController.updateOrder(req, res));
app.get("/api/order/search", checkAuthorization, (req, res) => orderController.searchOrder(req, res));

app.listen(port, () => { if (process.env.NODE_ENV === 'development') console.log(`Server is running at http://localhost:${port}`) });