//Requiring Packages
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Chat=require('./models/chat.js');
const methodOverride=require('method-override');

//Setting Paths
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Calling main Function
main().then(()=>{console.log('Connection Successfull..!!')})
.catch(err=>console.log(err));

//Creating Connection with DB
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Show Route
app.get('/chats', async(req,res)=>{
    let chats= await Chat.find();
    res.render('home.ejs',{chats});
})

//New Route
app.get('/chats/new',(req,res)=>{
    res.render('add.ejs');
})

//Create Route
app.post('/chats',(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    })
    newChat.save().then(()=>console.log('Chat was Saved')).catch(err=>console.log(err));
    res.redirect('/chats');
})

//Edit Route
app.get('/chats/:id/edit',async(req,res)=>{
    let {id}=req.params;
    let user=await Chat.findById(id);
    res.render('edit.ejs',{user});
})

//Update Route
app.put('/chats/:id', async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updated=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updated);
    res.redirect('/chats');
})

//Destroy Route
app.delete('/chats/:id', async(req,res)=>{
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
})

//Port Listening
app.listen('8080',()=>{
    console.log("Listening");
})