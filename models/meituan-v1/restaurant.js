import mongoose from 'mongoose';

const { Schema } = mongoose;

const meituanRestaurantsSchema = new mongoose.Schema({
  restaurantId: Number,
  statusId: Number,
  statusDesc: String,
  name: String,
  picUrl: String,
  shippingTime: String,
  shippingFee: Number,
  minPrice: Number,
  restaurantScore: Number,
  avgDeliveryTime: Number,
  distance: String,
  latitude: Number,
  longitude: Number,
  address: String,
  callCenter: String,
  monthlySales: Number,
  deliveryType: Boolean,
  invoiceSupport: Boolean,
  invoiceMinPrice: Number,
  restaurantTypeIcon: String,
  bulletin: String,
  supportPay: Boolean,
  cancelStatus: String,
  cancelInfo: String,
  discounts: [{
    info: String,
    iconUrl: String,
  }],
  productList: [{
    productId: {
      type: Schema.ObjectId,
      ref: 'MeituanProducts',
    },
    name: String,
    price: Number,
    picture: String,
  }],
  categoryInfoList: [{
    name: String,
    level: Number,
  }],
  arriveTime: [{
    date: String,
    statusId: Boolean,
    info: String,
    timelist: [{
      dataTypeTip: String,
      viewTime: String,
      unixtime: String,
      viewShippingFee: String,
    }],
  }],
  restaurantUserComment: [{
    username: String,
    commentScore: Number,
    shipTime: Number,
    comment: String,
    commentTime: Number,
  }],
  createTime: {
    type: Date,
    default: new Date(),
  },
});

const MeituanRestaurants = mongoose.model('MeituanRestaurant', meituanRestaurantsSchema);
export default MeituanRestaurants;
