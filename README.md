# Codefolio [![Build Status](https://travis-ci.com/msmfsd/codefolio.svg?token=pQuZQVJCHi2ifpjKbzd7&branch=master)](https://travis-ci.com/msmfsd/codefolio)

> Codefolio & Codefolio API are seperate projects that connect with each other to create your developer folio. Codefolio is the static front-end website/CMS, built with React, that displays your folio to the public and allows you to login and edit it. Codefolio API is a RESTful API server, built with NodeJS, that performs CRUD operations on data requested by your Codefolio site. See the [Codefolio + Codefolio API Guide](https://github.com/msmfsd/codefolio-api/#apiguide) as the first point of reference.

#### Requirements
- npm v3+ & node v4+
- [Codefolio API](https://github.com/msmfsd/codefolio-api)

#### Browser support
- Modern browsers ie. Chrome, FF, Safari, IE10+

#### Getting started
1. Clone this repo with ```git clone https://github.com/msmfsd/codefolio.git```
2. Open directory
3. Run ```npm install```
4. Remove existing git directory with ```rm -rf .git```
5. Make your own .git with ```git init```

#### Start dev server
1. Ensure your local Codefolio API server is configured and running
2. Update the root cf.config.js file with the development API_URL & API_KEY from your Codefolio API .env file
3. Run ```npm run start``` command
4. Open browser at [http://localhost:3000/](http://localhost:3000/)
5. To monitor application state you can install [Redux Devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) extension to your browser

#### Edit content using the CMS
1. Create your administrator at [http://localhost:3000/register](http://localhost:3000/register)
2. Login and start building your folio using the CMS at [http://localhost:3000/admin](http://localhost:3000/admin)
3. NOTE: your folio profile will be automatically created and saved to the db the first time your Codefolio API is called.

#### Build production bundle
1. Update the cf.config.js file with the production API_URL & API_KEY from your Codefolio API .env file
2. Run ```npm run build``` command
3. Follow the [Codefolio + Codefolio API Guide](https://github.com/msmfsd/codefolio-api/#apiguide) to publish your folio to a production server

#### Contributing
Feel free to open an issue or post a pull request

#### License
MIT License
