const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {type: String, unique: true},
  description: {type: String, default: ''},
  email: {type: String, unique: true},
  avatarUrl: {type: String, default: 'https://res.cloudinary.com/dkvyhy1hr/image/upload/v1529502028/no_photo.jpg'},
  avatarId: String,
  password: {type: String, default: '#'},
  twitter: {type: String,default: '#'},
  vk: {type: String, default: '#'},
  facebook: {type: String, default: '#'},
  google: {type: String, default: '#'},
  backgroundUrl: {type: String, default: 'https://res.cloudinary.com/dkvyhy1hr/image/upload/v1529502028/no_photo.jpg'},
  backgroundId: String,
  albums: [{type: Schema.Types.ObjectId, ref: 'Album'}],
  resetPasswordToken: String
});

UserSchema.methods.encryptPassword = password => {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',UserSchema);