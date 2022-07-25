const express = require('express');
const middleware = require('../Middlewares/middleware')
const { createOrder,getAllOrderOfCustomer, getAllOrder, getOrderById, updateOrder, deleteOrder } = require('../Controller/orderController')

const router = express.Router();

router.use('/', middleware)

router.post("/customers/:customerId/orders", createOrder);

router.get("/customers/:customerId/orders", getAllOrderOfCustomer);

router.get('/orders', getAllOrder)

router.get('/orders/:orderId', getOrderById)

router.put('/orders/:orderId', updateOrder)

router.delete('/orders/:orderId', deleteOrder)

module.exports = router