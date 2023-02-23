const express= require('express');
const { FlightModel } = require("../model/flightModel");
const jwt=require('jsonwebtoken');
const Flightroute=express.Router();
const bcrypt=require("bcrypt");


Flightroute.get("/flights",async(req,res)=>{
    try{
        const data =await FlightModel.find();
        res.send(data)

    }catch(err){
        res.send({"err":"Error"});
        console.log(err)
    }
})

Flightroute.get("/flights/:id",async(req,res)=>{
    const ID=req.params.id;

    
   
    try{
        const data=await FlightModel.find({_id:ID});
        res.send(data)

    }catch(err){
        res.send({"err":"Error"});
        console.log(err)
    }
})

Flightroute.post("/flights",async(req,res)=>{
    const data=req.body;

    try{
        const Flight=new FlightModel(data);
        await Flight.save();
        res.send({"msg":"Product Created",data})

    }catch(err){
        res.send({"err":"Error"});
        console.log(err)
    }
})

Flightroute.patch("/flights/:id",async(req,res)=>{
    const data=req.body;
    const Id=req.params.id;
    console.log(req.params)
   
    

    try{
        await FlightModel.findByIdAndUpdate({_id:Id},data);
        res.send({"msg":`Product data updated with Id:${Id}`})

    }catch(err){
        res.send({"err":"Can not update data"});
        console.log(err)
    }
})

Flightroute.delete("/flights/:id",async(req,res)=>{
    const data=req.body;
    const Id=req.params.id;
    try{
        await FlightModel.findByIdAndDelete({_id:Id},data);
        res.send({"msg":`Product data Delete with Id:${Id}`})

    }catch(err){
        res.send({"err":"Can notDelete data"});
        console.log(err)
    }
})
module.exports={Flightroute}