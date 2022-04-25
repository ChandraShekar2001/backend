const express = require('express')
const { newOrder, getSingleOrder, getLoggedInUserOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router()

const { isAuthenticatedUser, isAllowed } = require('../middleware/auth')


router.route('/orders').get(isAuthenticatedUser, isAllowed("admin"), getAllOrders);
router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/order/me').get(isAuthenticatedUser, getLoggedInUserOrder)
router.route('/admin/orders/:id').put(isAuthenticatedUser,isAllowed("admin"), updateOrder)
router.route('/admin/orders/:id').delete(isAuthenticatedUser,isAllowed("admin"), deleteOrder)


module.exports = router
