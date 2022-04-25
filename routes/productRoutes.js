const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, addToCart, deleteCartItem } = require('../controllers/productController')
const { isAuthenticatedUser, isAllowed } = require('../middleware/auth')

const router = express.Router()

 
router.route('/products').get( isAuthenticatedUser, getAllProducts)

router.route('/admin/product/new').post(isAuthenticatedUser, isAllowed('admin'), createProduct) 

router.route('/admin/product/:id').put(isAuthenticatedUser, isAllowed('admin'),updateProduct)

router.route('/admin/product/:id').delete(isAuthenticatedUser, isAllowed('admin'), deleteProduct)

router.route('/product/:id').get(getProductDetails).post(isAuthenticatedUser, addToCart).put(isAuthenticatedUser, deleteCartItem)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/review').get(isAuthenticatedUser, getProductReviews)

router.route('/review').delete(isAuthenticatedUser, deleteReview)

module.exports  = router