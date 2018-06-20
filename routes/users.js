const User = require('../models/User');
const Album = require('../models/Album');

module.exports = app => {
  app.get('/api/users/:userId',async (req,res) => {
    try {
      const id = req.params.userId;
      const user = await User.findOne({
        _id: id
      });
      if(user) {
        res.send(user);
      }
      else {
        res.status(500).send({error: 'Такой пользователь больше не существует'});
      }
    }
    catch(error) {
      res.status(500).send({error: 'Internal server error'});
    }
  });
};