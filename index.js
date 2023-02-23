const express =require("express")
const {connection}=require("./config/db");
const { Flightroute } = require("./routes/flight.routes");

const { Userroute } = require("./routes/user.routes");
const app=express();

app.use(express.json());
app.use("/api",Userroute)
app.use("/api",Flightroute)
app.listen(7001,async()=>{
    try{
        await connection;
        console.log("data base connected")
    }catch (err){
        console.log("data base not connected");
        console.log(err)
    }
    console.log("server is running on port 7001")
})
