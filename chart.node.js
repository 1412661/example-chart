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

    // Binding
    var day = mongoose.model('day', daySchema);
    
    // Find all objects in collection
    day.find(function (err, data) {
        if (err) return console.error(err);
        jsonData = data;
        console.log("[INFO] Data retrived !");
    });
});

var jsonData;

mongoose.connect('mongodb://quocbao:quocbao@ds151461.mlab.com:51461/chart');

app.listen(3000, function(){
	console.log("[INFO] Server started at localhost:3000");
});

app.use(express.static('./'));

app.get('/chart', function(req, res){
	// Data is returned as JSON
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(jsonData));
	//console.log(jsonData);
});


