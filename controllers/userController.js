const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel')
const genToken = require("../utils/tokenGen")
const { get } = require('request')
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");
const { resolveNs } = require('dns/promises')

// rahul.k20@iiits.in
// password

exports.signupPage = catchAsyncErrors(
    async (req, res, next) => {
        let err = ''
        res.render('signUp',{err})
    }
)

exports.login = catchAsyncErrors(async (req, res, next)=>{
    
    let err = ''
    res.render('login', {err:err})
})
exports.displayForgot = catchAsyncErrors(
    async(req, res, next)=>{
        const err=''
        res.render('forgot',{err})
    }
)

exports.displayReset = catchAsyncErrors(
    async(req, res, next)=>{
        res.render('resetpass')
    }
)

exports.createUser = catchAsyncErrors(
    async(req, res, next) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const cpassword = req.body.cpassword
        if(!email|| !password || !name || !cpassword) {
            const errormessage = "Please enter required fields"
            res.render('signUp',{
                err :errormessage,
            })
            // return next(new ErrorHandler("Please enter required fields", 401))
            next()
        }
        let userTest = await User.findOne({email})
        if (userTest){
            const errormessage = "User already exists"
            res.render('signUp',{
                err :errormessage,
            })  
        }
        var regEx = new RegExp('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/')
        if (regEx.test(password)){
            console.log('hi');
            const errormessage = "Password should contain atleast a sp. char. and number"
            res.render('signUp',{
                err :errormessage,
            })    
            next()
        }
        if (cpassword != password){
            const errormessage = "Password,Confirm Passwords mismatch"
            res.render('signUp',{
                err :errormessage,
            })
        }
        const user = await User.create({
            name, 
            email, 
            password,
            prof_pic:{
                public_id: 'sameple id',
                url: "profilepic"
            }
        })
        genToken(user, 201, res);
    }
)
     
exports.loginUser = catchAsyncErrors(
    async(req, res, next) => {
        const email = req.body.email
        const password = req.body.password

        if(!email || !password) {
            const errormessage = "Please enter required fields"
            res.render('login',{
                err :errormessage,
            })
            // return next(new ErrorHandler("Please enter required fields", 401))
        }

        const user = await User.findOne({email: email}).select("+password")
        if(!user){
            // console.log('hi');
            const err = "Invalid email or password"
            res.render('login',{err})
            // return next(new ErrorHandler("Invalid email or password", 401))
        }

        const passMatch = await user.comparePassword(password)
        // console.log(passMatch);

        if(!passMatch){
            const err = "Invalid password or Email"
            res.render('login',{err})
            // return next(new ErrorHandler("Invalid password or Email", 401))
        }
        // console.log(user);
        genToken(user, 200, res)
    }
)

exports.logOut = catchAsyncErrors(
    async(req, res, next)=>{
        
        // console.log(req.cookies.user.name);
        res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        // res.status(200).json({
        //     success: true,
        //     message: `${req.cookies.user.name} Logged out`
        // })
        res.status(200).redirect('/api/v1/login')
    }
)

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const email = req.body.email
    if(!email){
        const err="Please enter requires fields"
        res.render('forgot',{err})
    }

    const user = await User.findOne({email: email})
        if(!user){
            const err = "Invalid email"
            res.render('forgot',{
                err:err,
            })
        }
        
        if(user){
            const err = "Link has been sent to mail"
            const resetToken = await user.getResetPasswordToken();
  
            await user.save({ validateBeforeSave: false });
          
            const resetPasswordUrl = `${req.protocol}://${req.get(
              "host"
            )}/api/v1/password/reset/${resetToken}`;
          
            const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
          
            try {
              await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,
              });
                res.render('forgot',{err})
            } catch (error) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpire = undefined;
              await user.save({ validateBeforeSave: false });
              return next(new ErrorHandler(error.message, 500));
            }
            
        }

    // Get ResetPassword Token
    
  });


  exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash

    console.log(req.body);
    const resetPasswordToken = req.params.token
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken
    });

    console.log(user);
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    genToken(user, 200, res)
});
  
  
exports.getUserDetails = catchAsyncErrors(
    async(req, res, next) => {
        const id = req.cookies.user._id
        // console.log(req.user);
        const user  = await User.findOne({_id:id})
        // res.status(200).json({
        //     success: true,
        //     user,
        // }) 

        res.status(200).render('index', {user}) 
    }
)

exports.updatePassword = catchAsyncErrors(
    async(req, res, next) => {
        const id = req.cookies.user._id
        const user = await User.findOne({_id:id}).select("+password")
        const passwordMatched = await user.comparePassword(req.body.oldPassword)
        if(!passwordMatched){
            return next(new ErrorHandler("Old password incorrect", 400)) 
        }

        if(req.body.newPassword!=req.body.confirmPassword){
            return next(new ErrorHandler("Confirm password incorrect", 400))
        }

        user.password = req.body.newPassword
        await user.save()
        res.status(200).json({
            success: true,
            user
        })
        genToken(user, 200, res)
    }
)

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id);

    //     const imageId = user.avatar.public_id;

    //     await cloudinary.v2.uploader.destroy(imageId);

    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //     });

    //     newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //     };
    // }
    console.log(req.user);
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get all users(admin)


// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const id = req.cookies.user._id
    const user  = await User.findOne({_id:id}) 
    // console.log(req.cookies); 
    if (!user) {
        return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.render('profile', {user})
});

// update User Role -- Admin

// Delete User --Admin


exports.getAccountPage = catchAsyncErrors(
    async function (req, res, next) {
        console.log(req.cookies);
        res.render('account')
    }
)