const express = require('express');
const customerModel = require('../Model/CustomerModel');
const mongoose = require('mongoose');

const createCustomer = (req, res) => {
    // thu thập dữ liệu
    let body = req.body;
    // validate
    if (!body.fullName) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "FullName is required"
        })
    }
    if (!body.phone) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Phone is required"
        })
    }
    if (!body.email) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Email is required"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let customerModelData = {
        _id: mongoose.Types.ObjectId(),
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,        
        city: body.city,
        country: body.country,
        orders: body.orders
    }
    customerModel.create(customerModelData, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal Sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Create Customer Success",
                data: data
            })
        }
    })
}
// tạo get all  
const getAllCustomer = (req, res) => {
    customerModel.find((err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal Sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get All Customer Successfully",
                data: data
            })
        }
    })
}
// tạo get by id 
const getCustomerById = (req, res) => {
    // lấy param 
    let customerId = req.params.customerId;
    //B2 : Validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "Customer Id is not valid"
        })
    }
    // B3: Thao tắc với cơ sở dữ liệu
    customerModel.findById(customerId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get Customer by id success" + customerId,
                data: data
            })
        }
    })
}
// tạo post 
const updateCustomer = (req, res) => {
    // thu thập dữ liệu
    let customerId = req.params.customerId;
    let body = req.body;
    // validate
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Id customer is required"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let customerUpdate = {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        address: body.address,        
        city: body.city,
        country: body.country,
        orders: body.orders,
    }
    customerModel.findByIdAndUpdate(customerId, customerUpdate, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Update Customer Success",
                data: data
            })
        }
    })
}
// tạo post 
const deleteCustomer = (req, res) => {
    // B1: thu thập dữ liệu
    let customerId = req.params.customerId;
    //B2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Customer Id is not valid"
        })
    }
    //B3: Thao tắc với cơ sở dữ liệu
    customerModel.findByIdAndDelete(customerId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Delete Customer success" + customerId,
            })
        }
    })
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}

