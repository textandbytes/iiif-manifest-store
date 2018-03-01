var express = require('express');
var fs = require('fs');
var uuid = require('uuid');

// Create app
var app = express();

/*
Route                         HTTP Verb Description
-------------------------------------------------------------------------------------------
/api/manifests                GET       Get all manifests
/api/manifests                POST      Create a manifest - returns manifest id
/api/manifests/:manifest_id   GET       Get manifest by id
/api/manifests/:manifest_id   PUT       Update manifest with id
/api/manifests/:manifest_id   DELETE    Delete manifest with id (currently not implemented)
-------------------------------------------------------------------------------------------
*/


// middleware
app.use(function(req, res, next) {
  // TODO: implement middleware
  next();
});

app.get('/', function (req, res) {
  res.json({ data: { message: 'IIIF manifest store API' }}); 
});

app.route('/api/manifests')

  // list all manifets
  .get(function(req, res) {
    res.json({ data: { message: 'list all manifests' } });
  }) 

  // create a manifest
  .post(function(req, res) {
    
    var manifest = '';
    console.log(req);

    // TODO: assign uuid, store manifest, return created uuid
    var manifest_id = uuid();
    res.json({ data: { uri: manifest_id } });
});

app.route('/api/manifests/:manifest_id')

  // get manifest with id
  .get(function(req, res) {
    // TODO: return manifest with id
    res.json({ data: { message: 'manifest JSON here' } });
  })

  // update manifst with id
  .put(function(req, res) {
    // TODO: update manifest with id
    res.json({ data: { message: 'manifest updated' } });
  })

  // delete manifest with id
  .delete(function(req, res) {
    // Note: this is currently not implemented - we need authentication for this
    res.json({ data: { message: 'deleting manifests is currently not supported' } });
  });


// Set port
const PORT = process.env.PORT || 3001;

// Listen on port
app.listen(PORT, function () {
  console.log('IIIF manifest store server is up on port ' + PORT);
});
