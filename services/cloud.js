const {cloudName,cloudKey,cloudSecret} = require('../config/keys');
const cloud = require('cloudinary').v2;
const fs = require('fs');

cloud.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret
});

exports.uploadImage = path => {
  return new Promise((resolve,reject) => {
    cloud.uploader.upload(path,(error,result) => {
      if(error) reject(error);
      fs.unlinkSync(path);
      resolve(result);
    });
  });
};

exports.removeImage = id => {
  return new Promise((resolve,reject) => {
    cloud.uploader.destroy(id,(error,result) => {
      if(error) reject(error);
      resolve(result);
    });
  });
};