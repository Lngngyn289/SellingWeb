// const Chat = require("../../model");
const User = require("../../model/userModel");
// const chatSocket = require("../../sockets/client/chat.socket");
//[GET] /chat


module.exports.index = async (req,res) => {
  _io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  });
  // const userId = res.locals.user.id;
  // const fullName = res.locals.user.fullName;
  // SocketIO
  // chatSocket(req, res);
  res.render('client/pages/chat/index',{
    pageTitle: "CHAT"
  })
}