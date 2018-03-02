var express = require('express');
var fs = require('fs');
var uuid = require('uuid');
var bodyParser = require('body-parser');

// Create app
var app = express();

/*
Route                         HTTP Verb Description
-------------------------------------------------------------------------------------------
/api/manifests                GET       Get all manifests
/api/manifests                POST      Create a manifest - returns manifest uri
/api/manifests/:manifestId    GET       Get manifest by id
/api/manifests/:manifestId    PUT       Update manifest with id
/api/manifests/:manifestId    DELETE    Delete manifest with id (currently not implemented)
-------------------------------------------------------------------------------------------
*/

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
// app.use(express.methodOverride());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.route('/api/manifests')
  // list all manifets
  .get(function(req, res) {
    // look up manifest list on the file system
    var manifestFiles = fs.readdirSync('data/manifests');

    var manifestUris = [];
    manifestFiles.map((manifestFilename, index) => {
      manifestUris.push({
        uri: req.protocol + '://' + req.headers.host + '/api/manifests/' + manifestFilename
      })
    });

    // generate JSON list with manifest uris
    res.json({ manifests: manifestUris });
  }) 

  // create a manifest
  .post(function(req, res) {
    // create a unique id for the manifest
    var manifestId = uuid();

    // store the manifest on the file system
    fs.writeFileSync('data/manifests/' + manifestId, JSON.stringify(req.body));

    // set the status code in the response
    res.status(201);

    // return the manifest uri
    res.json({ uri: req.protocol + '://' + req.headers.host + '/api/manifests/' + manifestId });
  });

app.route('/api/manifests/:manifestId')
  // get manifest with id
  .get(function(req, res) {
    // get the manifest from the file system
    var manifestData = fs.readFileSync('data/manifests/' + req.params.manifestId, 'utf8');

    // return the manifest data
    res.json(JSON.parse(manifestData));
  })

  // update an existing manifest with id
  .put(function(req, res) {
    var manifestPath = 'data/manifests/' + req.params.manifestId;
    var statusCode = 200;

    // check the file system to determine whether the resource exists
    if(fs.existsSync(manifestPath)) {
      // overwrite the manifest data on the file system
      fs.writeFileSync(manifestPath, JSON.stringify(req.body));
    } else {
      statusCode = 404;
    }

    // set the status code in the response
    res.status(statusCode);
    res.json({ message: 'Manifest successfully updated' });
  })

  // delete an existing manifest with id
  .delete(function(req, res) {
    // Note: this is currently not implemented - we need authentication for this
    res.json({ errorMessage: 'Deleting manifests is currently not supported' });
  });

// set port
const PORT = process.env.PORT || 3001;

// listen on port
app.listen(PORT, function () {
  console.log('IIIF manifest store server is up on port ' + PORT);
});
