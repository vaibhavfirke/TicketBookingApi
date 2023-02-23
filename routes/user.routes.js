const express= require('express');
const { userModel } = require("../model/userModel");
const jwt=require('jsonwebtoken');
const Userroute=express.Router();
const bcrypt=require("bcrypt")
Userroute.get("/",async(req,res)=>{
    res.send("hello")
})
Userroute.post("/register",async(req,res)=>{
   const {email,password,name}=req.body;
   const userData=await userModel.find({email});
   if(userData.length==0){
    try{
   bcrypt.hash(password,5,async (err,hash)=>{

       const user=new userModel({name,email,password:hash});
       await user.save();
       res.send("Registered")
   })

    }catch (err){
        res.send("User not Registered")
        console.log(err)
    }
   }else{
    res.send("User AllReady exist!")
   }
})

Userroute.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await userModel.find({email});
        console.log(user);
        const user_id=user[0]._id;
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function (err,result){
                if(result){
                    const token=jwt.sign({course:user_id},"masai");
                    res.send({msg:"Login Successfull",token:token});
                }else{
                      res.send("Wrong credentials");
                }
            })
        }else{
            res.send("Wrong credntials  Check your Email or Password!")
        }

    }catch(err){
res.send("user not found");
console.log(err);
    }
})

module.exports={Userroute}