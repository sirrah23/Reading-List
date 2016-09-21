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

//Get all readings
app.get('/api/readings',function(req, res){
  return Reading.find(function(err, readings){
    if (! err){
      return res.send(readings);
    } else {
      return console.log(err);
    }
  });
});

//Create a new reading
app.post('/api/readings', function(req, res){
  let reading = new Reading({
    title: req.body.title,
    author: req.body.author,
    status: req.body.status
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

//Get a single reading by on id
app.get('/api/readings/:id', function(req, res){
  return Reading.findById(req.params.id, function(err, reading){
    if(! err){
      return res.send(reading);
    } else {
      return console.log(err);
    }
  });
});

//Update a reading after locating by id
app.put('/api/readings/:id', function(req, res){
  console.log("Updating book!");
  return Reading.findById(req.params.id, function(err, reading){
    reading.title = req.body.title;
    reading.author = req.body.author;
    reading.status = req.body.status;

    reading.save(function(err){
      if(! err){
        console.log("Reading updated");
      } else {
        console.log(err);
      }
      return res.send(reading);
    });
  });
});

//Delete a reading after locating by id
app.delete('/api/readings/:id', function(req, res){
  console.log("Deleting book!");
  return Reading.findById(req.params.id, function(err, reading){
    reading.remove(function(err){
      if(! err){
        console.log("Reading removed");
        return res.send('');
      } else {
        return console.log(err);
      }
    });
  });
});

//START SERVER
//----------------
const port = 8000;
app.listen(port, function(){
  console.log("Express server started on port %d in %s mode.",
              port, app.settings.env);
});
