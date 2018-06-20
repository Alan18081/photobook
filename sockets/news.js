module.exports = io => {
  io.on('connection', socket => {
    socket.on('NEW_IMAGE', payload => {

    });
  });
};