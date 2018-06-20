const Album = require('../models/Album');
const Image = require('../models/Image');
const upload = require('../helpers/multer');
const {uploadImage,removeImage} = require('../services/cloud');
const fs = require('fs');

module.exports = app => {
    app.get('/api/albums/:id', async (req,res) => {
      try {
        const {id} = req.params;
        const album = await Album.findOne({
          _id: id
        }).populate('author');
        if(album) {
          res.send(album);
        }
        else {
          res.status(404).send({error: 'Альбом не найден'});
        }
      }
      catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    app.get('/api/albums/users/:userId', async (req,res) => {
      try {
        const {userId} = req.params;
        const albums = await Album.find({
          author: userId
        }).populate('author');
        res.send(albums);
      }
      catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    app.post('/api/albums', upload.single('background'), async (req,res) => {
      try {
        const newAlbum = new Album({
          name: req.body.name,
          description: req.body.description,
          author: req.user._id,
          images: []
        });
        const backgroundImg = new Image({
          name: 'Обложка',
          description: 'Обложка для альбома',
          author: req.user._id,
          albumId: newAlbum.id,
          albumName: newAlbum.name
        });
        const {url,public_id} = await uploadImage(req.file.path);
        backgroundImg.imageId = public_id;
        backgroundImg.imageUrl = url;
        newAlbum.backgroundUrl = url;
        newAlbum.backgroundId = public_id;
        newAlbum.images.push(backgroundImg.id);
        await backgroundImg.save();
        await newAlbum.save();
        const album = await Album.findOne({
          _id: newAlbum.id
        }).populate('author');
        backgroundImg.author = req.user;
        console.log(backgroundImg);
        res.send({
          album,
          image: backgroundImg
        });
      }
      catch(error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    app.delete('/api/albums/:id',async (req,res) => {
      const {id} = req.params;
      try {
        const album = await Album.findOne({
          _id: id
        }).populate('images');
        await removeImage(album.backgroundId);
        album.images.forEach(async img => {
          await removeImage(img.imageId);
        });
        await Promise.all([
          Album.deleteOne({_id: id}),
          Image.deleteMany({albumId: id})
        ]);
        res.sendStatus(200);
      }
      catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });

    app.put('/api/albums/:id', upload.single('background'), async (req,res) => {
      try {
        const info = req.body;
        const {id} = req.params;
        const album = await Album.findOneAndUpdate(
          {
            _id: id
          },
          info,
          {
            new: true
          }
        ).populate('author');
        if(req.file) {
          await removeImage(album.backgroundId);
          const {url,public_id} = await uploadImage(req.file.path);
          album.backgroundUrl = url;
          album.backgroundId = public_id;
        }
        res.send(album);
      }
      catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
};