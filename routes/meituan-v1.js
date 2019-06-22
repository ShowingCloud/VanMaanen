const express = require('express');
const Restaurants = require('../controller/meituan-v1/restaurants');
const Orders = require('../controller/meituan-v1/orders');
const Products = require('../controller/meituan-v1/products');
const Auth = require('../controller/users/auth');

const router = express.Router();

router.get('/restaurants', Restaurants.getRestaurants.bind(Restaurants));
router.get('/restaurant/:restaurant_id', Restaurants.getRestaurant.bind(Restaurants));
//router.get('/search/restaurant', Restaurants.searchRestaurant.bind(Restaurants));

router.get('/products', Restaurants.getRestaurants.bind(Restaurants));
router.get('/product/:restaurant_id', Restaurants.getProducts.bind(Restaurants));

router.post('/order', Auth.authUser.bind(Auth), Orders.makeOrder.bind(Orders));
router.get('/orders', Auth.authUser.bind(Auth), Orders.getOrders.bind(Orders));
router.get('/order/:order_id', Auth.authUser.bind(Auth), Orders.getOrder.bind(Orders));

module.exports = router;
