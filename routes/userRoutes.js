const express = require('express')
const { createUser, landingPage, loginUser, logOut, forgotPassword, login, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser, signupPage, displayForgot, displayReset, resetPassword, getAccountPage } = require('../controllers/userController')
const { isAuthenticatedUser, isAllowed } = require('../middleware/auth')
const router = express.Router()

router.route('/signup').post(createUser).get(signupPage)

router.route('/login').post(loginUser).get(login)

router.route('/logout').get(logOut) 

router.route('/password/forgot').post(forgotPassword).get(displayForgot)

router.route('/password/reset/:token').post(resetPassword).get(displayReset)

router.route('/me').get(isAuthenticatedUser, getUserDetails)

router.route('/me/acc').get(isAuthenticatedUser, getAccountPage)

router.route('/me/acc/profile').get(isAuthenticatedUser, getSingleUser)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/me/update').put(isAuthenticatedUser, updateProfile)

<<<<<<< HEAD
=======

>>>>>>> 29aa5dbeeea7a1b161b164545c063ef0336f83e9



module.exports  = router 
