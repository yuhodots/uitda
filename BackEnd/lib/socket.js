module.exports = function (httpServer) {

  var io = require('socket.io');
  const socketServer = io(httpServer);
  const { chatting_message } = require('../models');
  let moment = require('moment');
  require('moment-timezone');
  moment.tz.setDefault("Asia/Seoul");
  moment.locale('ko');

  socketServer.on("connection", socket => {
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(message,id){
      //let room_id = req.params.id;
      //let username = req.user.username;
      let room_id = id;
      let username = "heewon";
      chatting_message.create({
        room_id:room_id, description:message, author:username, created:moment().format('YYYY년MM월DD일HH시mm분ss초')
      }).catch(function(err){
        throw err;
      });
      socketServer.emit('chat message', message);
    });
  });

  return socketServer;

}
