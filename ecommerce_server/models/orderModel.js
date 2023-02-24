const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        orderedItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
            }
        ],
        shippingAddress: { type: String, required: true },
        paymentMethod: { type: String, required: true, default: 'Cash' },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            lastUpdate: { type: String },
            userEmailId: { type: String },
        },
        taxPrice: { type: String, required: true, default: 0.0 },
        shippingPrice: { type: String, required: true, default: 0.0 },
        totalPrice: { type: String, required: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: { type: Date },
    },
    {
        collection: 'orderData',
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;