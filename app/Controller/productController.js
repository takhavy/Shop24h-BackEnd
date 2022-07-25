const express = require('express');
const productModel = require('../Model/ProductModel');
const ProductTypeModel = require('../Model/ProductTypeModel');
const mongoose = require('mongoose');

const createProduct = (req, res) => {
    // thu thập dữ liệu
    let body = req.body;
    // validate
    if (!body.name) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Name is required"
        })
    }
    if (!body.type) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Type is required"
        })
    }
    if (!body.imageUrl) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "ImageUrl is required"
        })
    }
    if (!body.buyPrice) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "BuyPrice is required"
        })
    }
    if (!body.promotionPrice) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "PromotionPrice is required"
        })
    }
    if (!body.amount) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Amount is required"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let productModelData = {
        _id: mongoose.Types.ObjectId(),
        description:body.description,
        name: body.name,
        type:  body.type,
        imageUrl: body.imageUrl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
        amount: body.amount,
    }

    ProductTypeModel.findOne(
        { _id: body.type },
        (errFind, productTypeData) => {
          if (errFind) {
            return res.status(500).json({
              status: "Error 500: Internal Server Error",
              message: errFind.message,
            });
          } else {
            if (!productTypeData) {
              return res.status(404).json({
                status: "Error 404 ",
                message: `productTypeData is not found`,
              });
            } else {
              productModel.create(productModelData, (err, data) => {
                console.log(productModelData);
                if (err) {
                  return res.status(500).json({
                    status: "Error 500: Internal Server Error",
                    message: err.message,
                  });
                } else {
                  return res.status(201).json({
                    status: "Create product successfully!!!",
                    data: data
                  });
                }
              });
            }
          }
        }
      );
}
// tạo get all  
const getAllProduct = (req, res) => {
    const { name, min, max, limit,type } = req.query;
    // let limit = req.query.limit;
  
    const condition = {};
    if (name) {
      const regex = new RegExp(`${name}`);
      condition.name = regex;
    }

    if (type) {
        condition.type = type;
    }

    if (min) {
      condition.promotionPrice = {
        ...condition.promotionPrice,
        $gte: min,
      };
    }
  
    if (max) {
      condition.promotionPrice = {
        ...condition.promotionPrice,
        $lte: max,
      };
    }
    productModel
    .find(condition)
    .populate('type')
    .sort({ timeCreated: -1 })
    .limit(parseInt(limit) || 0)
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          status: "Error 500: Internal Server Error",
          message: err.message,
        });
      } else {
        return res.status(200).json({
          status: "Get All Product info successfully!!!",
          data: data,
        });
      }
    });
    // productModel
    //   .find(condition)
    //   .limit(limit)
    //   .skip(skipValue)
    //   .exec((err, data) => {
        // ProductTypeModel.findOne(
        //     { _id: condition.type },
        //     (errFind, productTypeData) => {
        //       if (errFind) {
        //         return res.status(500).json({
        //           status: "Error 500: Internal Server Error",
        //           message: errFind.message,
        //         });
        //       } else {
        //         if (!productTypeData) {
        //           return res.status(404).json({
        //             status: "Error 404 ",
        //             message: `productTypeData is not found`,
        //           });
        //         } else {
        //             productModel.find((err, data) => {
        //                 if (err) {
        //                     return res.status(500).json({
        //                         status: "Error 500: Internal sever Error",
        //                         message: err.message
        //                     })
        //                 } else {
        //                     return res.status(200).json({
        //                         status: "Success: Get All Product Type Successfully",
        //                         data: data
        //                     })
        //                 }
        //             })
        //         }
        //       }
        //     }
        //   );
}
//tao get All limit
const getAllProductLimit = (request, response) => {
    //B1: chuẩn bị dữ liệu
    let limitProduct = request.params.limit;
    //B2:
    //B3: thao tác dữ liệu
    if (limitProduct) {
        productModel.find()
            .limit(limitProduct)
            .exec((err, data) => {
                if (err) {
                    return response.status(500).json({
                        message: `Internal server error: ${err.message}`
                    })
                } else {
                    return response.status(200).json({
                        status: 'GET limit product',
                        data: data
                    })
                }
            })
    } else {
        userModel.find((err, data) => {
            response.status(200).json({
                status: 'GET all product',
                data: data
            })
        })
    }
}
// tạo get by id 
const getProductById = (req, res) => {
    // lấy param 
    let productId = req.params.productId;
    //B2 : Validate
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Error 400: bad request",
            message: "Product Id is not valid"
        })
    }
    // B3: Thao tắc với cơ sở dữ liệu
    productModel.findById(productId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever Error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Get Product by id success" + productId,
                data: data
            })
        }
    })
}
// tạo post 
const updateProduct = (req, res) => {
    // thu thập dữ liệu
    let productId = req.params.productId;
    let body = req.body;
    // validate
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "ID is required"
        })
    }
    // b3 sử dụng cơ sở dữ liệu
    let productUpdate = {
        name: body.name,
        type: body.type,
        description:body.description,
        imageUrl: body.imageUrl,
        buyPrice: body.buyPrice,
        promotionPrice: body.promotionPrice,
        amount: body.amount,
    }
    ProductTypeModel.findOne({ _id: bodyRequest.type }, (err, typeExist) => {
        if (err) {
            return res.status(500).json({
                status: 'Error 500: Internal server error',
                message: err.message
            })
        } else {
            if (typeExist) {
                productModel.findByIdAndUpdate(productId, productUpdate, (err, data) => {
                    if (err) {
                        return res.status(500).json({
                            status: 'Error 500: Internal server error',
                            message: err.message
                        })
                    } else {
                        return res.status(200).json(data)
                    }
                })
            } else {
                return res.status(400).json({ message: 'ProductTypeID can not find!' })
            }
        }
    })
}
// tạo post 
const deleteProduct = (req, res) => {
    // B1: thu thập dữ liệu
    let productId = req.params.productId;
    //B2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "ProductType Id is not valid"
        })
    }

    //B3: Thao tắc với cơ sở dữ liệu
    productModel.findByIdAndDelete(productId, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Error 500: Internal sever error",
                message: err.message
            })
        } else {
            return res.status(200).json({
                status: "Success: Update product success" + productId + " Success ",
            })
        }
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    getAllProductLimit,
    getProductById,
    updateProduct,
    deleteProduct
}
