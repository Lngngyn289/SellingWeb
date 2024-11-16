import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

//Client send message
const formSendData = document.querySelector(".chat .inner-form")
if(formSendData){
  formSendData.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = e.target.content.value
    if(content){
      socket.emit("CLIENT_SEND_MSG", content)
      e.target.elements.content.value = ""
    }
  })
}
// END Client send msg

//Server return msg
socket.on("SERVER_RETURN_MSG", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id")
  const body = document.querySelector(".chat .inner-body")
  
  const div = document.createElement("div")
  const htmlFullName = ""
  if(myId == data.userId){
    div.classList.add("inner-outgoing")
  } else{
    htmlFullName = `<div class = "inner-name">${data.fullName}</div>`
    div.classList.add("inner-incomming")
  }
  div.innerHTML = `
  ${htmlFullName}
  <div class = "inner-content">${data.content}</div>
  `
  body.appendChild(div)
  body.scrollTop = body.scrollHeight
})
//END Server return msg

//Scroll chat to bottom
const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
  bodyChat.scrollTop = bodyChat.scrollHeight
}
//END scroll chat

//Emoji Picker
const buttonIcon = document.querySelector('button-icon')
if(buttonIcon){
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(buttonIcon,tooltip)
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown")
  }
}
//END emoji Picker