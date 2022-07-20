var express = require("express");
var app = express();

var path = require('path')
app.path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"pages")));
app.use(express.static(path.join(__dirname,"public")));

var Logindata = require(path.resolve('models/loginform.js'))
var registerdata = require(path.resolve('models/registerform.js'))


app.get("/", function(req,res){
    res.sendFile(__dirname + "/pages/Loginform.html");
});
app.get("/Loginform", function(req,res){
    res.sendFile(__dirname + "/pages/Loginform.html");
});
app.get("/registerform", function(req,res){
    res.sendFile(__dirname + "/pages/registerform.html");
});
app.get("/admin", function(req,res){
    res.sendFile(__dirname + "/pages/admin.html");
});



// Login
app.post("/Logindata",function(req,res){
    console.log(req.body);
    Logindata.findOne({'email':req.body.email,'password':req.body.password},function(err,docs){
        if(err || docs==null){
            console.log(err)
            res.sendStatus(500);
        }
        else{
            console.log("docs");
            res.send({message:"working"});

            
        }

    });
});



// login + register
app.post('/registerdata', function(req,res){
  
    var obj = new Logindata({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    Logindata.findOne({email: req.body.email }, function(err,docs){
        if(err || docs==null){
            //console.log(err)
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send({message:"working"});
                }else{
                    console.log(err)
                    res.send(err);
                }
            })
        } 
        else{

            res.sendStatus(500);
        }
    })
   
});


// Mangoose
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://chandu:chandu123@cluster0.wobdj.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Successfully Connected To MongoDB Database.'))


const Loginform=require('./models/loginform.js');
const registerform=require('./models/registerform.js');


app.listen(8080, ()=> console.log("Successfully Server Started"));