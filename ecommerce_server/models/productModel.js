const mongoose = require('mongoose');

// add product category
const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    {
        collection: 'reviewData',
        timestamps: true
    }
)

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true, default: 'https://res.cloudinary.com/dxqzbpcjt/image/upload/v1678547605/cld-sample-5.jpg' },
        price: { type: Number, required: true, default: 0 },
        avaiableStock: { type: Number, required: true, default: 0 },
        totalRating: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 },
        numberReviews: { type: Number, required: true, default: 0 },
        reviews: [reviewSchema],
    },
    {
        collection: 'productData',
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;