const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const apiFeatures = require('../utils/apiFeatures')
const mongoose = require("mongoose");

//create a product -- Admin
exports.createProduct = catchAsyncErrors(async(req, res, next) => {
    req.body.createdUser = req.user._id;
    const product = await Product.create(req.body)
    // console.log(req.user);
    res.status(200).json({
        success: true,
        product
    })
})

//get all products
exports.getAllProducts = catchAsyncErrors(async(req, res)=>{
    
    const resultPerPage = 5
    const productCount = await Product.countDocuments()
    // console.log(res);
    const apiFeature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

    const allProducts = await apiFeature.query;

    res.render('productsPage',{allProducts})
})


//update product -- Admin
exports.updateProduct = catchAsyncErrors(async(req, res)=>{

    let product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

//get product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    let product = await Product.findById(req.params.id)

    if(!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//delete product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler("product not found", 404))
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating),
          (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
});


exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
});
  
  // Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    console.log(product);
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.productId.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  

exports.addToCart = catchAsyncErrors(
  async function (req, res, next) {
    const id = req.user._id;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    // console.log(id, product._id);
    const cart = await Cart.findOne({user:id})
    let flag =0
    if(cart){
      for(let i = 0; i < cart.cartItems.length;i++){
          if(cart.cartItems[i]._id.toString()===productId){
            cart.cartItems[i].quantity+=1;
            flag=1
          }
      }
    
      if(!flag)      
      cart.cartItems.push(product);
      await cart.save();
      res.status(200).json({
        success: true,
        cart
      })
    }
    else{
      await Cart.create({ 
          user: id,
          product: product
      })
      const cart1 = await Cart.findOne({user:id})
      cart1.cartItems.push(product)  
      await cart1.save()    
      res.status(200).json({
        success: true,
        cart1
      })
    }
  })


exports.deleteCartItem = catchAsyncErrors(async(req, res, next)=>{
  const user = req.user._id
  const productId = req.params.id
  let cart = await Cart.find({user})
  cart = cart[0]
  // console.log(cart);
  for(let i = 0; i < cart.cartItems.length; i++){
    if(cart.cartItems[i]._id.toString() === productId && cart.cartItems[i].quantity>1){
      cart.cartItems[i].quantity-=1
    }
    else if(cart.cartItems[i]._id.toString() === productId && cart.cartItems[i].quantity==1){
      cart.cartItems.splice(i,1)
    }
  }
  // console.log(cart);
  cartItems = cart.cartItems
  // console.log(cartItems,user);

  await Cart.deleteOne({user})
  const newCart = await Cart.create({
    user,
    cartItems
  })
  res.status(200).json({
    success: true,
    newCart
  })



})