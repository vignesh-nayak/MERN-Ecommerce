const Order = require('../models/orderModel');

const createNewOrder = async (req, res) => {
    try {
        // otherinfo like address, payment, price etc
        const { user, orderedItems, otherInfo } = req.body;

        if (orderedItems.length === 0) {
            res.json({
                message: 'No items in list',
                statusCode: 400
            })
            return
        }

        const orderObject = {
            user,
            orderedItems,
            shippingAddress: otherInfo.shippingAddress,
            paymentMethod: otherInfo.paymentMethod,
            paymentResult: otherInfo.paymentResult,
            taxPrice: otherInfo.taxPrice,
            shippingPrice: otherInfo.shippingPrice,
            totalPrice: otherInfo.totalPrice,
            isPaid: otherInfo.isPaid,
            paidAt: otherInfo.paidAt
        }

        await Order.create(orderObject)
            .then(data => res.send({
                message: `Order added for ${user}`,
                data: data,
                statusCode: 200
            }))
            .catch(error => res.send({
                error: `error while adding order for ${user}, Error: ${error}`,
                statusCode: 500
            }))

    } catch (error) {
        res.send({
            error: error,
            statusCode: 500
        })
    }
}

const getOrdersOfUser = async (req, res) => {
    try {
        const id = req.body.id;

        const order = await Product.findOne({ _id: id });

        if (order === null) {
            res.send({ message: `order-${id} not found`, statusCode: 400 });
            return;
        }
        res.send({ order: order, statusCode: 200 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const updateOrder = async (req, res) => { }

const getOrderbyId = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Product.findOne({ _id: id });

        if (order === null) {
            res.send({ message: `order-${id} not found`, statusCode: 400 });
            return;
        }
        res.send({ order: order, statusCode: 200 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        if (orders.length === 0) {
            res.send({ message: `No product not found`, statusCode: 200 });
            return;
        }

        res.send({ orders: orders, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const searchOrder = async (req, res) => {
    try {
        const query = req.body.string;
        const orders = await Order.find({
            $or: [
                { "name": { '$regex': query } },
                { "description": { '$regex': query } },
            ]
        });

        if (orders.length === 0) {
            res.send({ message: `No product not found`, statusCode: 200 });
            return;
        }

        res.send({ orders: orders, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const deleteAllOrders = async (req, res) => {
    try {
        await Order.deleteMany({});
        res.json({ message: 'All Orders deleted successfully', statusCode: 200 });
    } catch (error) {
        res.json({ message: 'Orders was not able delete', error: error, statusCode: 500 });
    }
}

module.exports = {
    createNewOrder,
    updateOrder,
    getAllOrders,
    getOrdersOfUser,
    getOrderbyId,
    searchOrder,
    deleteAllOrders
}