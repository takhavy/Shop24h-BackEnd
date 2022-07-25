const express = require('express');
const middleware = require('../Middlewares/middleware')
const { createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer } = require('../Controller/customerController')

const router = express.Router();

router.use('/', middleware)

router.post('/customers', createCustomer)

router.get('/customers', getAllCustomer)

router.get('/customers/:customerId', getCustomerById)

router.put('/customers/:customerId', updateCustomer)

router.delete('/customers/:customerId', deleteCustomer)

module.exports = router