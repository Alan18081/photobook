const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImageSchema = new Schema({
  name: {type: String, default: 'Без названия'},
  description: {type: String, default: ''},
  albumName: String,
  albumId: String,
  imageUrl: String,
  imageId: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  likes: {type: Array,default: []},
  comments: [{
    text: String,
    sender: {type: Schema.Types.ObjectId, ref: 'User'}
  }]
});

module.exports = mongoose.model('Image',ImageSchema);