const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const {createProductAuto} = require('./productController')

const uploadProductImageLocal = async(req, res) =>{
  //check if file exists
  //check format
  //check size

  if(!req.files){
    throw new CustomError.BadRequestError('No File Uploaded')
  }


  let productImage = req.files.image;
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please Upload Image')
  }

  const maxSize = 1024*1024;
  if(productImage.size > maxSize){
    throw new CustomError.BadRequestError('Please upload image smaller 1KB')
  }

  const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`);
  await productImage.mv(imagePath);
  return res
  .status(StatusCodes.OK)
  .json({ image: { src:`/uploads/${productImage.name}`}});
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'upload-file',
    }
  );
  // const listName = ['MacBookPro','MacBookAir','Imac','Iphone','Ipad','IHome'];
  // const listPrice = [1000,1600,3500,8000,1200,5700];
  // const fillProduct = {
  //   name: listName[Math.floor(Math.random()*5)],
  //   price: listPrice[Math.floor(Math.random()*5)],
  //   image: result.secure_url
  // }
  // await createProductAuto(fillProduct)

  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
