const mongoose = require('mongoose');

const { Schema } = mongoose;

const meituanProductsSchema = new mongoose.Schema({
  spuId: Number,
  restaurantId: {
    type: Schema.ObjectId,
    ref: 'MeituanRestaurants',
  },
  name: String,
  minPrice: Number,
  unit: String,
  tag: String,
  description: String,
  picture: String,
  monthlySales: Number,
  statusId: Number,
  skuLabel: String,
  attrs: [{
    name: String,
    values: [{
      id: Number,
      value: String,
    }],
  }],
  skus: [{
    skuId: Number,
    spec: String,
    description: String,
    picture: String,
    price: Number,
    originPrice: Number,
    boxNum: Number,
    boxPrice: Number,
    minOrderCount: Number,
    statusId: Number,
    stock: Number,
  }],
});

const MeituanProducts = mongoose.model('Foods', meituanProductsSchema);
module.exports = MeituanProducts;
