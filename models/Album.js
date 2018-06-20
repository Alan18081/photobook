const mongoose = require('mongoose');
const {Schema} = mongoose;
const Image = require('./Image');

const AlbumSchema = new Schema({
  name: {type: String,default: 'Без названия'},
  description: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  backgroundUrl: String,
  backgroundId: String,
  images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
});

module.exports = mongoose.model('Album',AlbumSchema);