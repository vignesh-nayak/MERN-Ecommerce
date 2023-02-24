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
        image: { type: String, required: true, default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2F3d-high-quality-vector-mobile-260nw-2121419597.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fmobile-phone&tbnid=m-IhYvbc2YuU1M&vet=12ahUKEwi22uT_5KX9AhWUmtgFHddsC20QMygFegUIARDpAQ..i&docid=AwUWvSYftfWHUM&w=325&h=280&q=phone%20photo&ved=2ahUKEwi22uT_5KX9AhWUmtgFHddsC20QMygFegUIARDpAQ' },
        price: { type: Number, required: true },
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