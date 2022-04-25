const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(
  
  async (req, res, next) => {

    // console.log(req.cookies.user);
    const { token } = req.cookies;

    if (!token) {
      res.redirect('/api/v1/login')
    }
    const decodedData =  jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS512', maxAge: '3d'});
    // console.log(decodedData);
    // console.log(req.cookies.user._id);
    // console.log(await User.findById(req.cookies.user.id)); 
    const id = req.cookies.user._id;
    req.user = await User.findById(id);
    // console.log(req.user);
    next();
});

exports.isAllowed = (...roles)=>{
  return catchAsyncErrors(async (req, res, next)=>{
    // console.log(req.cookies.user);
  
    if(!roles.includes(req.user.role)){
        return next(
          new ErrorHander(
          `Role : ${req.user.role} is not allowed to access this resource`
          , 403))
      }

      next()
    })
  
}
