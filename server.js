"use strict";

//Dependencies
const application_root = __dirname,
      express = require('express'),   //Web framework
      path = require('path'),         //Dealing with file paths
      mongoose = require('mongoose'), //MongoDB
      bodyParser = require('body-parser');  //Body parser util

// DATABASE CONNECTION
//-------------------------
//Connect to the database
mongoose.connect('mongodb://localhost/library_database');

//Schemas
const readingSchema = new mongoose.Schema({
  title: String,
  author: String
});


//Model
const Reading = mongoose.model('Reading',readingSchema);

// SERVER CONNECTION
// --------------------
//Create the server
const app = express();

//Configure the server
//Populates request.body after parsing it
app.use(bodyParser.json());

//Serve static content
app.use(express.static(path.join(application_root, 'site')));


// ROUTING
// ----------------
//Routes
app.get('/api', function(req, res){
  res.send('Library is running!');
});

app.get('/api/readings',function(req, res){
  return Reading.find(function(err, readings){
    if (! err){
      return res.send(readings);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/readings', function(req, res){
  console.log(req.body.title);
  console.log(req.body.author);
  console.log(req.body);
  let reading = new Reading({
    title: req.body.title,
    author: req.body.author
  });
  reading.save(function(err){
    if (!err){
      return console.log('created');
    } else {
      return console.log(err);
    }
  });
  return res.send(reading);
});

//START SERVER
//----------------
const port = 8000;
app.listen(port, function(){
  console.log("Express server started on port %d in %s mode.",
              port, app.settings.env);
});
