const express = require('express');
const middleware = require('../Middlewares/middleware')
const { createProductType, GetALlProductType, GetProductTypeByID, UpdateProductType, DeleteProductType } = require('../Controller/productTypeController')

const router = express.Router();

router.use('/', middleware)

router.post('/productTypes', createProductType)

router.get('/productTypes', GetALlProductType)

router.get('/productTypes/:productTypeId', GetProductTypeByID)

router.put('/productTypes/:productTypeId', UpdateProductType)

router.delete('/productTypes/:productTypeId', DeleteProductType)

module.exports = router