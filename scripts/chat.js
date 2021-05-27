class Chatroom {
    constructor(room, username) {
        this.username = username;
        this.room = room;
        this.chats=db.collection('chats');
    }

    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            created_at = firebase.firestore.Timestamp.fromDate(now),
            message:message,
            room=this.room,
            username: this.username,
            
        }

        //saving to database

        const response = await this.chats.add(chat)
        return response
    }
}

const chatroom = new Chatroom('gaming','wajdan');
console.log(chatroom);