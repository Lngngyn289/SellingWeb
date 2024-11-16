const Chat = require("../../model/chatModel");
const User = require("../../model/userModel");
// const chatSocket = require("../../sockets/client/chat.socket");
//[GET] /chat


module.exports.index = async (req,res) => {
  const userId = res.locals.user.id
  const fullName = res.locals.user.fullName
  _io.once('connection', (socket) => {
    socket.on("CLIENT_SEND_MSG", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content
      })
      await chat.save()
      _io.emit("SERVER_RETURN_MSG", {
        fullName: fullName,
        userId: userId,
        content: content
      })
    })
  });


  //Lay data tu DB
  const chats = await Chat.find({
    deleted: false
  })

  for(const chat of chats){
    const infoUser = await User.findOne({
      _id: chat.user_id
    }).select("fullName")
    chat.infoUser = infoUser
  }
  
  res.render('client/pages/chat/index',{
    pageTitle: "CHAT",
    chats: chats
  })
}