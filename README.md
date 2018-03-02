# iiif-manifest-store
A simple Node application to store and retrieve IIIF manifests via REST API


## How to set up the application ##

### Prerequisites ###

* Install npm globally: https://github.com/npm/npm
* Install nvm (Node Version Manager) globally: https://github.com/creationix/nvm

### How to set up the application ###

* Clone this repository: `git clone git@github.com:textandbytes/iiif-manifest-store.git`
* Change into the project directory: `cd iiif-manifest-store`
* Install Node v8.1.4 with nvm: `nvm install v8.9.4`
* Install the required node modules into the project: `npm install`

## How to run the application ##

* Start the server: `npm run start`
  * The application will run on [http://localhost:3001](http://localhost:3001) by default

## API ##

| Route                      | HTTP Verb     | Description                                         |
| -------------------------- | ------------- | --------------------------------------------------- |
| /api/manifests             | GET           | Get all manifests                                   |
| /api/manifests             | POST          | Create a manifest - returns manifest uri            |
| /api/manifests/:manifestId | GET           | Get manifest by id                                  |
| /api/manifests/:manifestId | PUT           | Update manifest with id                             |
| /api/manifests/:manifestId | DELETE        | Delete manifest with id (currently not implemented) |

