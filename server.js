//Dependencies
const application_root = __dirname,
      express = require('express'),   //Web framework
      path = require('path'),         //Dealing with file paths
      mongoose = require('mongoose'), //MongoDB
      bodyParser = require('body-parser');  //Body parser util

//Create the server
const app = express();

//Configure the server
//Populates request.body after parsing it
app.use(bodyParser.json());

//Serve static content
app.use(express.static(path.join(application_root, 'site')));


//Routes
app.get('/api', function(req, res){
  res.send('Library is running!');
});


//Start server
const port = 8000;
app.listen(port, function(){
  console.log("Express server started on port %d in %s mode.",
              port, app.settings.env);
});
