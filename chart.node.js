var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;

// Connect to DB
db.on('error', console.error);
db.once('open', function () {
	console.log("[INFO] Connected to database !");

	// Define DB structure to retrive data
    var daySchema = new mongoose.Schema({
        label: String, data: Array
    });

    var growSchema = new mongoose.Schema({
        name: String, data: Array
    });

    // Binding
    var day = mongoose.model('day', daySchema);
    var grow = mongoose.model('grow', daySchema);
    
    // Find all objects in collection
    // For Chart.js
    day.find(function (err, data) {
        if (err) return console.error(err);
        jsonChart = data;
        console.log("[INFO] Days retrived !");
    });

    // For Highchart.js
    grow.find(function (err, data) {
        if (err) return console.error(err);
        jsonHighchart = data;
        console.log("[INFO] Grow retrived !");
    });
});

var jsonChart;
var jsonHighchart;

mongoose.connect('mongodb://quocbao:quocbao@ds151461.mlab.com:51461/chart');

app.listen(3000, function(){
	console.log("[INFO] Server started at localhost:3000");
});

app.use(express.static('./'));

app.get('/chartjs', function(req, res){
	// Data is returned as JSON
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(jsonChart));
	//console.log(jsonData);
});

app.get('/highchart', function(req, res){
    // Data is returned as JSON
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(jsonHighchart));
    //console.log(jsonHighchart);
});
