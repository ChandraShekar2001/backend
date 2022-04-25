const express = require('express')
<<<<<<< HEAD
const { dashboard,getAllUser, updateUserRole, getUpdateRoleForm, deleteUser } = require('../controllers/adminController')
=======
const { dashboard, home, getAllUser } = require('../controllers/adminController')
const { Admin_createProductForm,Admin_order,Admin_processOrder,Admin_products,Admin_review,Admin_updateForm,Admin_Form,Admin_users } = require('../controllers/adminController')
>>>>>>> 29aa5dbeeea7a1b161b164545c063ef0336f83e9
const { isAuthenticatedUser, isAllowed } = require('../middleware/auth')
const router = express.Router()

router.route('/dashboard').get(isAuthenticatedUser,dashboard)

<<<<<<< HEAD
router.route('/admin/users').get(isAuthenticatedUser, isAllowed("admin"), getAllUser)

// router.route('/admin/:id').get(isAuthenticatedUser, isAllowed('admin'), getSingleUser)

router.route('/admin/:id')
                .post(isAuthenticatedUser, isAllowed('admin'), updateUserRole)
                .get(getUpdateRoleForm)
                

router.route('/admin/delete/:id').post(isAuthenticatedUser, isAllowed('admin'), deleteUser)
=======
router.route('/dashboard/home').get(isAuthenticatedUser, home)

// router.route('/admin/Admin_createProductForm').get(isAuthenticatedUser,Admin_createProductForm)

router.route('/admin/users').get(isAuthenticatedUser,isAllowed('admin'),getAllUser)

// router.route('/admin/:id').get(isAuthenticatedUser, isAllowed('admin'), getSingleUser)

// router.route('/admin/:id').put(isAuthenticatedUser, isAllowed('admin'), updateUserRole)

// router.route('/admin/:id').delete(isAuthenticatedUser, isAllowed('admin'), deleteUser)
>>>>>>> 29aa5dbeeea7a1b161b164545c063ef0336f83e9

module.exports = router