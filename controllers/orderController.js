const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

exports.newOrder = catchAsyncErrors(
    async(req, res, next) =>{
        const shippingInfo = req.body.shippingInfo
        const orderItems = req.body.orderItems
        const paymentInfo = req.body.paymentInfo
        const itemsPrice = req.body.itemsPrice
        const taxPrice = req.body.taxPrice
        const shippingPrice = req.body.shippingPrice
        const totalPrice = req.body.totalPrice


        const order = await Order.create({
            shippingInfo: shippingInfo,
            orderItems: orderItems,
            paymentInfo: paymentInfo,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            order
        })
    }
)

//get single order
exports.getSingleOrder = catchAsyncErrors(
    async  (req, res, next)=> {
        const id = req.params.id
        const order = await Order.find({id}).populate("user","name email")
        
        if(!order){
            return next(new ErrorHandler("Order not found with this id", 404))
        }
        res.status(200).json({
            success: true,
            order
        })
    }
)


exports.getLoggedInUserOrder = catchAsyncErrors(
    async (req, res, next)=> {
        const id = req.user.id

        const orders = await Order.find({user:id})
        if(orders.length == 0){
            res.status(200).json({
                success: true,
                numOfOrders: orders.length
            })
        }
        res.status(200).json({
            success: true,
            numOfOrders: orders.length,
            orders
        })
    }
)


exports.getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find();
    
        let totalAmount = 0;
    
        orders.forEach((o) => {
            totalAmount += o.totalPrice;
        });
    
        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });
    }
);
  
exports.updateOrder = catchAsyncErrors(
    async(req, res, next)=>{
        const order = await Order.findById(req.params.id)
        if(!order){
            return next(new ErrorHandler("Order not found with this id",  404))
        }
        if(order.orderStatus ==="Delivered"){
            return next(new ErrorHandler("Order already delivered", 404))
        }

        order.orderItems.forEach(async(o)=>{
            await updateStock(o.product, o.quantity)
        })

        order.orderStatus = req.body.status

        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now()
        }

        await order.save()
        res.status(200).json({
            success: true,
        })
        
    }
)

exports.deleteOrder = catchAsyncErrors(
    async(req, res, next)=>{
        const id = req.params.id 

        const order = await Order.findById(id)
        if(!order){
            return next(new ErrorHandler("Order not found with this id",  404))
        }

        await order.remove()
        res.status(200).json({
            success: true,
        })
    }
)


async function updateStock(productId, quantity){
    const product = await Product.findById(productId)
    
    product.Stock -= quantity
    await product.save({validateBeforeSave: false})
}