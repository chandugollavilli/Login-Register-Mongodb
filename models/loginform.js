const mongoose = require('mongoose');
const Task = mongoose.Schema;

const Logindata= new mongoose.Schema(
    {
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true,
        },
        
    });

module.exports = mongoose.model("Logindata" , Logindata);
