//dom queries
const chatList = document.querySelector(".chat-list");
const newChat = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const update = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms")
const chatroom = new Chatroom("general", "Anonymous");
const chatUI = new ChatUI(chatList);
//getting chat

chatroom.getChat((data) => {
    chatUI.render(data);
});

//adding new chat
newChat.addEventListener("submit", (e) => {
    e.preventDefault();
    if (localStorage.getItem('username') !== null){
    const message = newChat.message.value.trim();
    chatroom
        .addChat(message)
        .then(() => {
            newChat.reset();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    else{
        alert('Please setup a username!')
        newChat.reset();
    }
    });

newName.addEventListener("submit", (e) => {
    e.preventDefault();
    nameValue = newName.name.value.trim();
    localStorage.setItem("username", nameValue);
    chatroom.updateName(nameValue);
    newName.classList.add("d-none");
    console.log(update.textContent,'lol');
    update.innerHTML = `<span style="font-weight:bold">Current Username:</span> <span> ${localStorage.username}</span>`;
});

if (localStorage.getItem("username") !== null) {
    newName.classList.add("d-none");
    update.innerHTML = `<span style="font-weight:bold">Current Username:</span> <span> ${localStorage.username}</span>`;
    chatroom.updateName(localStorage.username);
}

rooms.addEventListener('click',e=>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear()
        chatroom.updateRoom(e.target.id);
        chatroom.getChat(chat=>{chatUI.render(chat)});
    };
})