const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const logSchema = new mongoose.Schema({
    task:{
        type:String,
        trim:true,
        required:true,
        minlength:3
    },
    project:{
        type: ObjectId,
        ref:"Project",
        required:true
    },
    startDate:{
        type:Date,
        trim:true,
        default:Date.now,
        required:true
    },
    endDate:{
        type:Date,
        trim:true,
        required:true,
        default:Date.now
    },
    startTime:{
        type:String,
        trim:true,
        required:true,
        default:"00:00"
    },
    endTime:{
        type:String,
        trim:true,
        required:true,
        default:"00:00"
    },
    duration:{
        type:Number,
        trim:true,
        default:0
       
    }
},{timestamps:true});


module.exports = mongoose.model("Log", logSchema);