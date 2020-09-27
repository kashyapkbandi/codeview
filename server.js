const express = require('express');
const path = require('path');
const hbs = require('hbs'); 
const request = require('request');
var bodyParser = require('body-parser')


var app = express();
const port = process.env.PORT || 3000;

// middleware
// __dirname - stores path to directory

app.use(express.static(__dirname + '/assets'));
const viewPath = path.join(__dirname,'./templates/views');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

console.log(viewPath);
// tell express to use templates instead of views. 

app.set('views',viewPath);




app.get('/',(req,res)=>{
res.render('Main');
});

 
app.post('/callback',(req,res)=>{
res.render('callback');
});

app.set('view engine','hbs');




app.listen(port);