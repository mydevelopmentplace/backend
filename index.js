var express = require('express');
var mongoose = require('mongoose');
var bodyparser  = require('body-parser');
var User = require('./models/User');
var cors = require('cors');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/meanAuthAngular', function(err,response){
    if(err) console.log("There is error in connecting with mongodb");
    console.log("Connection has been added");

});

app.set('port', process.env.port || 3000);
app.use(bodyparser.json());
app.use(cors());
app.get('/',(req,res)=>{
 res.send("Hello");
});

app.post('/register',(req,res)=>{
    console.log(req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    
    var user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    user.save((err, result)=>{
        if(err)
        {
            console.log("There is a error in adding user in database");
            res.send({success: "Falied to add user",status:500});
        }
            res.send({success: "Successfully added user",status:200});
    
    });
   });

app.listen(app.get('port'), function(err, response){
    console.log("Server is running on port ", app.get('port'));
});