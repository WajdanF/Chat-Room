class Chatroom {
    constructor(room, username) {
        this.username = username;
        this.room = room;
        this.chats = db.collection("chats");
        this.unsub;
    }

    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            created_at: firebase.firestore.Timestamp.fromDate(now),
            message: message,
            room: this.room,
            username: this.username,
        };
        //saving to database
        const response = await this.chats.add(chat);
        return response;
    }

    getChat(callback) {
        this.unsub= this.chats
        .where('room','==',this.room)//takes in 3 arguments: room property in the document is equal to room
        .orderBy('created_at')  
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    callback(change.doc.data());
                }
            });
        });
    }

    updateName(username){
        this.username = username;
    }
    updateRoom(room){
        this.room=room;
        if(this.unsub){
        this.unsub();
        }
        
    }
}
