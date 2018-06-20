const User = require('../models/User');
const upload = require('../helpers/multer');
const {uploadImage,removeImage} = require('../services/cloud');

module.exports = app => {
  app.post('/api/saveProfile',upload.fields([{name: 'avatar',maxCount: 1},{name: 'background',maxCount: 1}]),async (req,res) => {
    try {
      const info = req.body;
      const user = await User.findOneAndUpdate(
        {
          _id: req.user._id
        },
        info,
        {new: true}
      );
      if(req.files.avatar) {
        if(user.avatarId) {
          await removeImage(user.avatarId);
        }
        const {url,public_id} = await uploadImage(req.files.avatar[0].path);
        user.avatarUrl = url;
        user.avatarId = public_id;
      }
      if(req.files.background) {
        if(user.backgroundId) {
          await removeImage(user.backgroundId);
        }
        const {url,public_id} = await uploadImage(req.files.background[0].path);
        user.backgroundUrl = url;
        user.backgroundId = public_id;
      }
      console.log(user);
      await user.save();
      res.send(user);
    }
    catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });
};