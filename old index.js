var express = require('express');
//var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
app.use(express.json()); 

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array()); 
app.use(express.static('public'));
app.get('/', function(req, res){
   res.render('form');
});
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
var Person = mongoose.model("Person", personSchema);
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/person', function(req, res){
    res.render('person');
 });
 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    //console.log(personInfo)
    
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       newPerson.save(function(err, Person){
          if(err)
             res.render('show_message', {message: "Database error", type: "error"});
          else
             res.render('show_message', {
                message: "New person added", type: "success", person: personInfo});
       });
    }
 });
// for parsing application/json


app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
app.listen(3000);