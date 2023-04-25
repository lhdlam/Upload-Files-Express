const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProduct = async(req, res) =>{
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({product})
};

// const createProductAuto = async(data) =>{
//   const product = await Product.create(data)
//   console.log(product);
//   return "Done"
// };

const getAllProduct = async(req, res) =>{
  let products = await Product.find({})
  res.status(StatusCodes.OK).json({products})
};

module.exports = {
  createProduct,
  getAllProduct,
  // createProductAuto,
}