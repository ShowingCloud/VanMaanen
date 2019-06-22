const express = require('express');
const Auth = require('../controller/users/auth');
const Admin = require('../controller/users/admin');

const router = express.Router();

//router.get('/user_info', Auth.authUser, Admin.userInfo);
//router.post('/change_avatar', Auth.authUser, Admin.changeAvatar);
//router.post('/logout', Admin.logout);
//router.post('/address', Auth.authUser, Admin.addAddress);
//router.get('/all_address', Auth.authUser, Admin.getAllAddress);
//router.get('/address', Auth.authAdmin, Admin.getAddress);
//router.post('/update_address', Auth.authUser, Admin.updateAddress);
//router.delete('/address', Auth.authUser, Admin.deleteAddress);
//router.get('/user_statistic', Auth.authAdmin, Admin.userStatistic);

module.exports = router;
