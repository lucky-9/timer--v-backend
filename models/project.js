const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        unique:true
    }
},{timestamps:true});


module.exports = mongoose.model("Project", projectSchema);