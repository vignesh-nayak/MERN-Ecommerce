const Order = require('../models/orderModel');

const createNewOrder = async (req, res) => {
    try {
        const { user, orderedItems, otherInfo } = req.body.orderInfo;

        if (orderedItems && orderedItems.length === 0) {
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
                order: data,
                statusCode: 200
            }))
            .catch(error => res.send({
                message: `error while adding order for ${user}`,
                error: error,
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
        const id = req.params.userId;

        const orders = await Order.find({ user: id });

        if (orders.length === 0) {
            res.send({ message: `orders not found for user`, statusCode: 400 });
            return;
        }
        res.send({ orders: orders, statusCode: 200 });
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

        const order = await Order.findOne({ _id: id });

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
            res.send({ message: `No orders not found`, statusCode: 200 });
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
            res.send({ message: `No orders not found`, statusCode: 200 });
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