const mongoose=require('mongoose');
const Chat=require("./models/chat.js")

main().then(()=>{console.log("Connected to MongoDB")});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');
}


let chats=[
    {
    from:"sani",
    to:"ayan",
    msg:"hi,ayan",
    created_at:new Date()
    },
     {
    from:"lav",
    to:"ayan",
    msg:"see you ",
    created_at:new Date()
    },
     {
    from:"rohit",
    to:"ayan",
    msg:"bye",
    created_at:new Date()
    },
     {
    from:"rahul",
    to:"ayan",
    msg:"hello",
    created_at:new Date()
    }    
];

Chat.insertMany(chats)
