const express = require('express');

const productTypeModel = require('../Model/ProductTypeModel');

const mongoose = require('mongoose');

const createProductType = (req, res) => {
    // thu thập dữ liệu
    let body = req.body;
    // validate
    if (!body.name) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "name is required"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let productTypeData = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
    }
    productTypeModel.create(productTypeData, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(201).json({
                status: "Success: Create ProductType success",
                data: data
            })
        }
    })


}

const GetALlProductType = (req, res) => {
    productTypeModel.find((err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get All Product Type Successfully",
                data: data
            })
        }
    })

}

const GetProductTypeByID = (req, res) => {
    //B1: thu thập dữ liệu
    let productTypeId = req.params.productTypeId;
    //B2 : Validate
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "productType Id is not valid"
        })
    }
    // B3: Thao tắc với cơ sở dữ liệu
    productTypeModel.findById(productTypeId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get product by id success" + productTypeId,
                data: data
            })
        }
    })

}

const UpdateProductType = (req, res) => {
    // thu thập dữ liệu
    let productTypeId = req.params.productTypeId;
    let body = req.body;
    // validate
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "productType Id is not valid"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let productTypeUpdate = {
        name: body.name,
    }
    productTypeModel.findByIdAndUpdate(productTypeId, productTypeUpdate, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Update product type success",
                data: data
            })
        }
    })

}

const DeleteProductType = (req, res) => {
    let productTypeId = req.params.productTypeId;
    if (!mongoose.Types.ObjectId.isValid(productTypeId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "productType Id is not valid"
        })
    }

    productTypeModel.findByIdAndDelete(productTypeId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Delete Product Type Success",
            })
        }
    })
}

module.exports = {
    createProductType,
    GetALlProductType,
    GetProductTypeByID,
    UpdateProductType,
    DeleteProductType
}