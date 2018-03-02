# iiif-manifest-store
A simple Node application to store and retrieve IIIF manifests via REST API. It can be used in conjunction with the [IIIF Manifest Editor](https://github.com/bodleian/iiif-manifest-editor) to store manifests remotely. Please note that this application currently does not support authentication so anybody can POST and GET manifests to the store. Use it behind a firewall and/or for testing purposes only.


## How to set up the application ##

### Prerequisites ###

* Install npm globally: https://github.com/npm/npm
* Install nvm (Node Version Manager) globally: https://github.com/creationix/nvm

### Installation ###

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

