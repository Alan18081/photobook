const Image = require('../models/Image');
const Album = require('../models/Album');
const upload = require('../helpers/multer');
const {uploadImage,removeImage} = require('../services/cloud');

module.exports = app => {
  app.get('/api/images/search/:query', async (req,res) => {
    try {
      const query = decodeURIComponent(req.params.query);
      if(query === 'all') {
        const results = await Image.find({})
          .limit(9)
          .populate('comments.sender')
          .populate('author');
        res.send(results);
      }
      else {
        const searchReg = new RegExp(query,'i');
        const results = await Image.find({
          name: {
            $regex: searchReg
          }
        }).populate('comments.sender').populate('author');
        res.send(results);
      }
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  app.get('/api/images/:albumId/:offset', async (req,res) => {
    try {
      const {albumId,offset} = req.params;
      const images = await Image.find({
        albumId
      })
        .skip(Number(offset))
        .limit(9)
        .populate('comments.sender')
        .populate('author');
      res.send(images);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  app.get('/api/images/news/offset/:offset', async (req,res) => {
    try {
      const {offset} = req.params;
      const [images,size] = await Promise.all([
        Image.find({}).sort({_id: -1})
          .skip(Number(offset))
          .limit(3)
          .populate('comments.sender')
          .populate('author'),
        Image.count()
      ]);
      res.send({
        images,
        size
      });
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/images/addImages/:albumId',upload.any(),async (req,res) => {
    try {
      const {albumId} = req.params;
      const images = [];
      const album = await Album.findOne({
        _id: albumId
      });
      for(let file of req.files) {
        const {url,public_id} = await uploadImage(file.path);
        const image = new Image({
          name: 'Без названия',
          description: 'Без описания',
          albumName: album.name,
          albumId: album._id,
          author: req.user._id,
          imageUrl: url,
          imageId: public_id,
          likes: [],
          comments: []
        });
        album.images.push(image._id);
        await image.save();
        image.author = req.user;
        images.push(image);
      };
      await album.save();
      res.send(images);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/images/:imageId/album/:albumId',async (req,res) => {
    const {imageId,albumId} = req.params;
    try {
      const image = await Image.findOne({_id: imageId});
      await removeImage(image.imageId);
      const [album] = await Promise.all([
        Album.findOneAndUpdate(
          {
            _id: albumId
          },
          {
            $pull: {
              images: imageId
            }
          },
          {new: true}
        ).populate('author'),
        Image.deleteOne({_id: imageId})
      ]);
      res.send(album);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.put('/api/images/:id', async (req,res) => {
    const info = req.body;
    const {id} = req.params;
    try {
      const image = await Image.findOneAndUpdate(
        {
          _id: id
        },
        info,
        {new: true}
      ).populate('author').populate('comments.sender');
      res.send(image);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/images/:id/addComment', async (req,res) => {
    const {id} = req.params;
    const newComment = {
      text: req.body.text,
      sender: req.user._id
    };
    try {
      const image = await Image.findOneAndUpdate(
          {
            _id: id
          },
          {
            $push: { comments:  newComment}
          },
          {new: true}
        ).populate('author')
          .populate('comments.sender');
      res.send(image);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.put('/api/images/:id/like', async (req,res) => {
    const {id} = req.params;
    try {
      const image = await Image.findOne({_id: id})
        .populate('author')
        .populate('comments.sender');
      const likeIndex = image.likes
        .findIndex(id => String(id) === req.user.id);
      if(likeIndex === -1) {
        image.likes.push(req.user._id);
      }
      else {
        image.likes.splice(likeIndex,1);
      }
      await image.save();
      res.send(image);
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
};