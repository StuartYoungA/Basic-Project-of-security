require('dotenv').config()
const express = require("express");        
const bodyParser = require("body-parser");
const ejs = require("ejs");   
const app = express();  

app.set('view engine', 'ejs');   
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var encrypt = require('mongoose-encryption');




const mongoose = require('mongoose');



main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/UserDB");   //to connect it, if some special characters are present in password then encode it ,like here we have @ ..   @ = %40
  console.log("Hey amaan server is running");
}




const User_Schema=mongoose.Schema({
    email:String,
    password:String
})


User_Schema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields:["password"] });
const UserDetail=mongoose.model("UserDetail",User_Schema);


// console.log(process.env.SECRET)

app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/secrets",(req,res)=>{
    res.render("secrets");
});

app.get("/oops",(req,res)=>{
    res.render("oops");
});
app.get("/correctPAssword",(req,res)=>{
    res.render("correctPAssword");
});


app.post("/register",async(req,res)=>{
    const a=req.body.username;
    const b=req.body.password;
    try{
        const newdetail=new UserDetail({email:a,password:b});

       
            newdetail.save();
            res.render("secrets");
        
    }
    catch(e){
        console.log(e.message);
    }
    
});

app.post("/login",async(req,res)=>{
    const Username=req.body.username;
    const Password=req.body.password;
    
    try{
        const founded=await UserDetail.findOne({email:Username});
        
        if(founded){
            if(founded.password === Password){
                res.redirect("secrets");
            }
            else{
                res.redirect("correctPAssword")
            }


        }
        else{
            res.redirect("oops")
        }
        
    }
    catch(e){
        console.log(e.message);
    }
    
})




app.route("/submit")
// .post(async(req,res)=>{
//     const entered=req.body.secret;
//     // console.log(entered);
//     res.render("secrets",{sec:entered});
    
// })
.get(async(req,res)=>{
    res.render("submit")
});










app.listen(3000, function() {
    console.log("Server started on port 3000");
});
