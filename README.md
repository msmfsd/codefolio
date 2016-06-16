# Codefolio [![devDependency Status](https://david-dm.org/msmfsd/codefolio/dev-status.svg)](https://david-dm.org/msmfsd/codefolio#info=devDependencies) [![travis Status](https://api.travis-ci.org/msmfsd/codefolio.svg?branch=master)](https://travis-ci.org/msmfsd/codefolio)

> Front-end application for building your developer online folio website with Codefolio & Codefolio API

#### Requirements
- npm v3.8+ & node v5.8+
- Codefolio API - [get it here](https://github.com/msmfsd/codefolio-api).

## Getting started
1. Clone this repo with ```git clone https://github.com/msmfsd/codefolio.git```
2. Open directory
3. Run ```npm install```
4. Make your own package.json (optional)
5. * Remove existing git directory with ```rm -rf .git```
6. Make your own .git with ```git init```

## Start dev server
**Dev server is running with hot reloading and it should really not be production server!**

1. Run ```npm dev``` command
2. Open browser at [http://localhost:3000/](http://localhost:3000/)

## Build bundle for uploading to your production server
1. Run ```npm run publish``` command
2. Your compiled app file is located at dist folder

##### How to create your Codefolio API site to connect this Codefolio application
1. Install Codefolio API - it can be found here: [Codefolio API](https://github.com/msmfsd/codefolio-api)
2. Follow the Codefolio API setup guide in the Codefolio API Readme
3. Update the config with your Codefolio API's ADMIN_API_KEY from .env
4. Update the config with your server host name that you publish this API on to.


> NOTE: Codefolio & Codefolio API are seperate projects that connect with each other to create your developer folio website. This static front-end application connects to your Codefolio API - a RESTful API that performs CRUD operations on data requested by your Codefolio website. The API and front-end application are separated for ease of use, security and best practice.

>Locally you can run both servers on different localhost ports: say your Codefolio site is on localhost:3000 and this API is on localhost: 8090. For production you will need 2 public server endpoints and some knowledge of server admin could be advantageous. An example live setup could be:

> Codefolio - Deploy to your Heroku dyno

> Codefolio API - create an AWS Ubuntu instance with Nginx/Node/MongoDB

## Contributing
Feel free to open issue or post pull request

All contributions are appreciated!

## License
MIT License
