const mongoose=require('mongoose');
const Chat=require('./models/chat.js');

main().then(()=>{console.log("Success")}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([
    {
        from:'Abdullah',
        to:'Sheryar',
        msg:'Hello',
        created_at:new Date()
    },
    {
        from:'Usman',
        to:'Sheryar',
        msg:'Can I Come',
        created_at:new Date()
    },
    {
        from:'Usman',
        to:'Abdullah',
        msg:'Hello There',
        created_at:new Date()
    },
    {
        from:'Ali',
        to:'Ahmad',
        msg:'I am going',
        created_at:new Date()
    },
    {
        from:'Zain',
        to:'Ali',
        msg:'I am Here',
        created_at:new Date()
    },
]).then(res=>console.log(res))
.catch(err=>console.log(err));