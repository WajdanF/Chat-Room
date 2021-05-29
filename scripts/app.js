const chatroom = new Chatroom('general','zhenia');

chatroom.addChat('hello');
//ggetting chat

chatroom.getChat((data)=>{
    console.log(data);
})