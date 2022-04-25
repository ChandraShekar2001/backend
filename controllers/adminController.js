const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')
<<<<<<< HEAD
const ErrorHandler = require('../utils/errorHandler')
=======

const ErrorHandler = require('../utils/errorhandler')
>>>>>>> 29aa5dbeeea7a1b161b164545c063ef0336f83e9
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Userss = require('../models/userModel')
const mongoose = require('mongoose')
const { getAllProducts } = require('./productController')



exports.dashboard = catchAsyncErrors(
    async function (req, res, next) {
        res.render('dashboard', {user: req.user})
    }
)

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).render('Admin_users',{userss:users})
});

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).redirect('/api/v1/admin/users')
});


exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // const imageId = user.avatar.public_id;

    // await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).redirect('/api/v1/admin/users')
});

exports.getUpdateRoleForm = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.params.id)
        res.render('Admin_updateForm', {id: req.params.id,user})
    }
)
<<<<<<< HEAD
=======


exports.createproductform = catchAsyncErrors(
    async function (req,res,next){
        res.render('Admin_createProductForm'
          


        )
    }
)

exports.Admin_order = catchAsyncErrors(
    async function (req,res,next){
         return res.render('Admin_order'

        )
    }
)


exports.Admin_processOrder= catchAsyncErrors(
    async function (req,res,next){
        res.render('Admin_processsOrder'

        )
    }
)


exports.Admin_products = catchAsyncErrors(
    async function (req,res,next){
        const productss = Product.find({}).sort({name:1})


        res.render('Admin_products',{productss})
    })
exports.Admin_review = catchAsyncErrors(
    async function (req,res,next){
        res.render('Admin_review'

        )
    }
)

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const userss = await User.find();

    res.render('Admin_users',{userss})
});




exports.Admin_updateForm = catchAsyncErrors(
    async function (req,res,next){
        const id = req.params.id
        
        rolee = req.body.role
        const result = await Userss.updateOne({_id:id},{role:role})
        
    }
)
exports.Admin_Form=catchAsyncErrors(
    async function(req,res,next){
        id = req.params.id
        
        res.render('Admin_updateForm',{id})

    }

)
exports.Admin_users = catchAsyncErrors(
    async function (req,res,next){
        // const userss = await Userss.find({})
         res.render('payment')
            
            
        
        

        
        
    }
)
>>>>>>> 29aa5dbeeea7a1b161b164545c063ef0336f83e9
