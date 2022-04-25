const User = require('../models/userModel')
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

exports.getAllCartItems = catchAsyncErrors(async(req, res) =>{
    console.log('hello');
    const id = req.user._id;
    console.log(id);
    const cartItems = await Cart.findOne({user:id})

    if(!cartItems) {
        return next(new ErrorHandler("cart not found", 404))
    }

    res.status(200).render('cart', {cartItems})
})
