const express= require('express');
const app=express();

const mongoose=require('mongoose');
const path=require('path');
const Chat=require("./models/chat.js")
const methodOverride=require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))//define static files from publi flder path
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
main().then(()=>{console.log("Connected to MongoDB")});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');
}


//index route show all chats
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();//extract chats from db
    
    res.render("index",{chats})//pass chats and when render ejs template index.ejs
})

//new Route from render route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//add new chat into db router post create chat route

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    newchat
    .save()
    .then((res)=>{
        console.log("saved in db");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats")
})


//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id)
    res.render("edit.ejs",{chat});
})

//put route update msg
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params
    let {msg:newmsg}=req.body;
    let updatedmsg=await Chat.findByIdAndUpdate(
        id,
        {msg:newmsg},
        {runValidators:true,new:true}
    );
    console.log(updatedmsg);
    res.redirect("/chats")
})

//delete rote
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params
    let deletedmsg=await Chat.findByIdAndDelete(id)
    console.log(deletedmsg)
    res.redirect("/chats")
})







let chat1=new Chat({
    from:"sani",
    to:"ayan",
    msg:"hi,ayan",
    created_at:new Date()
});
chat1.save().then(res=>{
    console.log(res);
})

const port=3000;

app.get('/',(req,res)=>{
    res.send("Hello World!");
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
