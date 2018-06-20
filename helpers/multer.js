const {staticPath} = require('../config/keys');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: staticPath,
  filename: (req,file,cb) => cb(null,file.originalname)
});

module.exports = multer({storage});