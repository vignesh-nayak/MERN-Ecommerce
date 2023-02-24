require('dotenv').config();
const express = require("express");
const connectMongoDB = require('./connect');
const cors = require('cors');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const { checkAuthorization } = require('./middleware');

connectMongoDB();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => res.send({ message: 'Backend is running successfully....' }));

// userRouter
app.post("/api/user/create", (req, res) => userController.createNewUser(req, res));
app.post("/api/user/login", (req, res) => userController.login(req, res));
app.post("/api/user/forgotPassword", (req, res) => userController.forgotPassword(req, res));
app.get("/api/user/getUser", (req, res) => checkAuthorization(req, res), (req, res) => userController.getUser(req, res));
app.get("/api/user/:userId", (req, res) => checkAuthorization(req, res), (req, res) => userController.getUserById(req, res));
app.post("/api/user/updateName", (req, res) => checkAuthorization(req, res), (req, res) => userController.updateUserName(req, res));
app.post("/api/user/updatePassword", (req, res) => checkAuthorization(req, res), (req, res) => userController.updateUserPassword(req, res));
app.post("/api/user/updatePermission", (req, res) => checkAuthorization(req, res), (req, res) => userController.updateUserPermission(req, res));
app.get("/api/user/all", (req, res) => checkAuthorization(req, res), (req, res) => userController.getAllUsers(req, res));
app.delete("/api/user/delete", (req, res) => checkAuthorization(req, res), (req, res) => userController.deleteUser(req, res));
app.get("/api/user/search", (req, res) => checkAuthorization(req, res), (req, res) => userController.searchUser(req, res));

// productRouter
app.get("/api/product/all", (req, res) => productController.getAllProducts(req, res));
app.get("/api/product/:id", (req, res) => productController.getProductById(req, res));
app.post("/api/product/create", (req, res) => checkAuthorization(req, res), (req, res) => productController.createNewProduct(req, res));
app.delete("/api/product/delete", (req, res) => checkAuthorization(req, res), (req, res) => productController.deleteProduct(req, res));
app.get("/api/product/search", (req, res) => checkAuthorization(req, res), (req, res) => productController.searchProduct(req, res));
app.post("/api/product/:id", (req, res) => checkAuthorization(req, res), (req, res) => productController.updateProduct(req, res));
app.post("/api/product/:id/addReview", (req, res) => checkAuthorization(req, res), (req, res) => productController.addProductReview(req, res));

// orderRouter
app.post("/api/order/create", (req, res) => checkAuthorization(req, res), (req, res) => orderController.createNewOrder(req, res));
app.get("/api/order/all", (req, res) => checkAuthorization(req, res), (req, res) => orderController.getAllOrders(req, res)); // -> 1
app.delete("/api/order/delete", (req, res) => checkAuthorization(req, res), (req, res) => orderController.deleteAllOrders(req, res));
app.get("/api/order/:id", (req, res) => checkAuthorization(req, res), (req, res) => orderController.getOrderbyId(req, res)); // -> 1
app.post("/api/order/:id", (req, res) => checkAuthorization(req, res), (req, res) => orderController.updateOrder(req, res));
app.get("/api/order/:userId", (req, res) => checkAuthorization(req, res), (req, res) => orderController.getOrdersOfUser(req, res)); // -> 1
app.get("/api/order/search", (req, res) => checkAuthorization(req, res), (req, res) => orderController.searchOrder(req, res));

app.listen(port, console.log(`Server is running at http://localhost:${port}`));