const express = require('express');
const orderModel = require('../Model/OrderModel');
const CustomerModel = require('../Model/CustomerModel');
const mongoose = require('mongoose');

const createOrder = (req, res) => {
    // thu thập dữ liệu

    let customerId = req.params.customerId;
    let bodyReq = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return response.status(400).json({
        status: "Error 400: Bad Request",
        message: "customerId  is invalid",
      });
    }
  
    const createBody = {
      _id: mongoose.Types.ObjectId(),
      orderDate: bodyReq.orderDate,
      shippedDate: bodyReq.shippedDate,
      note: bodyReq.note,
      orderDetail: bodyReq.orderDetail,
      cost: bodyReq.cost,
    };
  
    orderModel.create(createBody, (err, data) => {
      if (err) {
        return res.status(500).json({
          status: "Error 500: Internal Server Error",
          message: err.message,
        });
      } else {
        CustomerModel.findByIdAndUpdate(
          customerId,
          {
            $push: { orders: data._id },
          },
          (err, updateCustomer) => {
            if (err) {
              return res.status(500).json({
                status: "Error 500: Internal server error",
                message: err.message,
              });
            } else {
              return res.status(201).json({
                status: "Create order successfully",
                data: data,
              });
            }
          }
        );
      }
    });
}
const getAllOrder = (req, res) => {
    CustomerModel.find((err, data) => {
        if (err) {
          return res.status(500).json({
            status: "Error 500: Internal Server Error",
            message: err.message,
          });
        } else {
          return res.status(200).json({
            status: "Get All orders info successfully",
            data: data,
          });
        }
      });
}
const getOrderById = (req, res) => {
    // lấy param 
    let orderId = req.params.orderId;
    //B2 : Validate
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "orderId is not valid"
        })
    }
    // B3: Thao tắc với cơ sở dữ liệu
    orderModel.findById(orderId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get Order by id success" + orderId,
                data: data
            })
        }
    })
}
const updateOrder = (req, res) => {
    // thu thập dữ liệu
    let orderId = req.params.orderId;
    let body = req.body;
    // validate
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "orderId is not valid"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let orderData = {
        orderDate: body.orderDate,
        shippedDate: body.shippedDate,
        note: body.note,
        orderDetail: body.orderDetail,
        cost: body.cost
    }
    orderModel.findByIdAndUpdate(orderId, orderData, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Update Order Success",
                data: data
            })
        }
    })
}
const deleteOrder = (req, res) => {
    let customerId = req.params.customerId;
    let orderId = req.params.orderId;
  
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        status: "Error 400: Bad request",
        message: `orderId is in valid`,
      });
    }
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        status: "Error 400: Bad request",
        message: `customerId is in valid`,
      });
    }
  
    orderModel.findByIdAndDelete(orderId, (err) => {
      if (err) {
        return res.status(500).json({
          status: "Error 500: Internal Server Error",
          message: err.message,
        });
      } else {
        CustomerModel.findByIdAndUpdate(
          customerId,
          { $pull: { orders: orderId } },
          (err, updatedData) => {
            if (err) {
              return res.status(500).json({
                status: "Error 500: Internal Server Error",
                message: err.message,
              });
            } else {
              return res.status(204).json({
                status: "Delete Order Info & Customer Info successfully",
              });
            }
          }
        );
      }
    });
}
const getAllOrderOfCustomer = (req, res) => {
    let customerId = req.params.customerId;
    //B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        status: "Error 400: Bad Request",
        message: "customerId is invalid",
      });
    }
    //B3: Thao tác với cơ sở dữ liệu
    CustomerModel
      .findById(customerId)
      .populate("orders")
      .exec((err, data) => {
        if (err) {
          return res.status(500).json({
            status: "Error 500: Internal server error",
            message: err.message,
          });
        } else {
          return res.status(200).json({
            status: "Get data success",
            data: data.orders,
          });
        }
      });
  };


module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAllOrderOfCustomer
}

