const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: Date,
    arrivalTime: Date,
    seats: Number,
    price: Number
});
const FlightModel=mongoose.model("flight",userSchema);
module.exports={FlightModel};