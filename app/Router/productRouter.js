const express = require('express');
const middleware = require('../Middlewares/middleware')
const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct,getAllProductLimit } = require('../Controller/productController')

const router = express.Router();

router.use('/', middleware)

router.post('/products', createProduct)

router.get('/products', getAllProduct)

router.get("/products-limit/:limit", getAllProductLimit);

router.get('/products/:productId', getProductById)

router.put('/products/:productId', updateProduct)

router.delete('/products/:productId', deleteProduct)

module.exports = router