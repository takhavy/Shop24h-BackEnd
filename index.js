const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productTypeRouter = require('./app/Router/productTypeRouter')
const productRouter = require('./app/Router/productRouter')
const customerRouter = require('./app/Router/customerRouter')
const orderRouter = require('./app/Router/orderRouter')
const cors=require('cors')
// Kết nối với MongoDB:
mongoose.connect("mongodb://localhost:27017/Shop24h_API", function(error) {
 if (error) throw error;
 console.log('Successfully connected');
})
const port = 8000;

app.use(express.json());

app.use(express.urlencoded({extends: true}))

app.use(cors({
    origin:'*'
}))
app.use('/', productTypeRouter)
app.use('/', productRouter)
app.use('/', customerRouter)
app.use('/', orderRouter)


app.listen(port, () => {
    console.log(`app running on port ${port}`)
})