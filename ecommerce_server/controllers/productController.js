const { uploadSingleToCloudinary } = require('../middleware');
const Product = require('../models/productModel');

const createNewProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice, productAvaiableStock = 0 } = req.body;
        const productImage = await uploadSingleToCloudinary(req.file);

        if (!productName || !productDescription || !productImage || !productPrice) {
            res.send({
                error: 'Mandatory fields - name, description, image and rice',
                statusCode: 400
            })
            return;
        }

        const productObject = {
            name: productName,
            description: productDescription,
            image: productImage,
            price: productPrice,
            avaiableStock: productAvaiableStock
        }

        await Product.create(productObject)
            .then(data => res.send({
                message: `data added for ${data.name}`,
                data: data,
                statusCode: 200
            }))
            .catch(error => res.send({
                error: `error while adding ${productObject.name}, error: ${error}`,
                statusCode: 500
            }))

    }
    catch (err) {
        res.send({ error: err, statusCode: 500 })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });

        if (product === null) {
            res.send({ message: `product-${id} not found`, statusCode: 400 });
            return;
        }
        res.send({ product: product, statusCode: 200 });
    }
    catch (e) {
        res.send({
            error: e,
            statusCode: 500
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({ _id: id });
        if (product === null) {
            res.send({ message: `product-${id} not found`, statusCode: 400 });
            return;
        }

        const {
            productName = product.productName,
            productDescription = product.productDescription,
            productImage = product.productImage,
            productPrice = product.produproductPricect,
            productAvaiableStock = product.productAvaiableStock
        } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    productName,
                    productDescription,
                    productImage,
                    productPrice,
                    productAvaiableStock
                }
            }
        );

        res.send({ product: updatedProduct, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        if (products.length === 0) {
            res.send({ message: `No product not found`, statusCode: 200 });
            return;
        }

        res.send({ products: products, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.body.id;
    try {
        await Product.deleteOne({ _id: id });
        res.json({ message: `product-${id} deleted successfully`, statusCode: 200 });
    } catch (error) {
        res.json({ message: `product-${id} was not able delete`, error: error, statusCode: 500 });
    }
}

const searchProduct = async (req, res) => {
    try {
        const query = req.params.string;
        const products = await Product.find({
            $or: [
                { "name": { '$regex': query.toLowerCase() } },
                // { "description": { '$regex': query } },
            ]
        });

        if (products.length === 0) {
            res.send({ message: `No product not found`, statusCode: 200 });
            return;
        }

        res.send({ products: products, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const addProductReview = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({ _id: id });
        if (product === null) {
            res.send({ message: `product-${id} not found`, statusCode: 400 });
            return;
        }

        // get user and find for already add review;
        const { name = '', comment = '', user = '' } = req.body;
        let { rating = 0 } = req.body;
        rating += product.totalRating;

        const reviewObject = { name, rating, comment, user };

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    reviews: [...product.reviews, reviewObject],
                    totalRating: rating,
                    rating: Math.round(rating / (numberReviews + 1)),
                    $inc: {
                        numberReviews: 1
                    }
                }
            }
        );

        res.send({ product: updatedProduct, statusCode: 200 })
    }
    catch (e) {
        res.send({ error: e, statusCode: 500 })
    }
}

const deleteAllProduct = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'All products deleted successfully', statusCode: 200 });
    } catch (error) {
        res.json({ message: 'products was not able delete', error: error, statusCode: 500 });
    }
}

module.exports = {
    createNewProduct,
    getProductById,
    updateProduct,
    getAllProducts,
    deleteProduct,
    searchProduct,
    addProductReview,
    deleteAllProduct
}