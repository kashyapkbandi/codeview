const express = require('express');
const path = require('path');
const hbs = require('hbs'); 
const request = require('request');
var sf = require('node-salesforce');
//var localstorage = require('node-localstorage');
var bodyParser = require('body-parser')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

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

var conn = new sf.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://login.salesforce.com'
});

app.get('/authenticate', (req, res) => {
    conn.login('kkalakbandi-euy8@force.com', 'Transformer1uGJhyISOQwHqGFv5t13odlUk', function(err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        // console.log('inside'+conn.accessToken);
        // console.log('inside'+conn.instanceUrl);
        
        // // logged in user property
        // console.log("User ID: " + userInfo.id);
        // console.log("Org ID: " + userInfo.organizationId);
        res.send({accessToken : conn.accessToken ,
        instanceURL : conn.instanceURL});
        localStorage.setItem('accessToken',conn.accessToken);
        console.log('asdasdasdasdasdasd'+localStorage.getItem('accessToken')); 

        });          
});

app.get('/',(req,res)=>{





res.render('Main');
});

 
app.post('/callback',(req,res)=>{
res.render('callback');
});

app.set('view engine','hbs');




app.listen(port);