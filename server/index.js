const app = require('./app');
const syncAndSeed = require('./db');
const port = process.env.PORT || 1337;
const socketio = require('socket.io');

syncAndSeed().then(() => {
  const io = socketio(
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    })
  );

  io.on('connection', function(socket) {
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('flashSaleProd', prod => {
      console.log(prod);
      socket.broadcast.emit('flashSaleProd', {
        prod,
      });
    });
  });
});
