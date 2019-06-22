const mongoose = require('mongoose');

const { Schema } = mongoose;

const meituanUsersSchema = new mongoose.Schema({
  meituanOpenId: String,
  meituanNickname: String,
  meituanDesensitizationPhone: String,
  meituanAvatar: String,
  accessToken: String,
  expiry: Date,
  userId: {
    type: Schema.ObjectId,
    ref: 'Users',
    index: {
      unique: true,
    },
  },
  addresses: [{
    addressId: Number,
    name: String,
    gender: Boolean,
    phone: String,
    address: String,
    houseNumber: String,
    latitude: String,
    longitude: String,
    canShip: Boolean,
    addressRangeTip: String,
  }],
});

const MeituanUsers = mongoose.model('MeituanUser', meituanUsersSchema);
module.exports = MeituanUsers;
