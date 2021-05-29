//dom queries
const chatList = document.querySelector(".chat-list");

const chatroom = new Chatroom('general','zhenia');
const chatUI = new ChatUI(chatList)
//ggetting chat

chatroom.getChat((data)=>{
    chatUI.render(data)
})