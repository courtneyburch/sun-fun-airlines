var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({extended: true}));

nunjucks = require('nunjucks');
nunjucks.configure('pages', {
    autoescape: true, 
    express: app
});

app.set('view engine', 'html');
app.use(express.static('public'));

const schedule = [
    {number: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
    {number: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
    {number: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
    {number: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
    ]

app.get('/', function(req, res){
    res.render('welcome', {page_title: "welcome page"});
});


app.get('/flights', function(req, res){
    res.render('form', {page_title: 'flight form', schedule: schedule});
});


app.post('/summary', function(req, res){
    const reqBody = req.body;
    console.log(reqBody);
    const name = req.body.fullname;
    const flight = req.body.flightnumber;
    const seating = req.body.seating;
    const meal = req.body.meal;

    flight_summary = {page_title: 'summary', name: name, flight: flight, seating: seating, meal: meal};
    res.render('summary', flight_summary);
});

app.use(function(req, res){
    res.status(404).send("Sorry, this page does not exist")
});

app.listen(3000, function(){
    console.log('Listening on port 3000, press Ctrl-C to terminate.')
});