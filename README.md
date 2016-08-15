# Codefolio [![Build Status](https://travis-ci.org/msmfsd/codefolio.svg?token=pQuZQVJCHi2ifpjKbzd7&branch=master)](https://travis-ci.org/msmfsd/codefolio)

Codefolio project is an open source build-your-own folio website & CMS for developers to showcase their skills and work. See the [Codefolio + Codefolio API Guide](https://github.com/msmfsd/codefolio-guide) as the first point of reference.

> Codefolio & Codefolio API are seperate projects that connect with each other to create your developer folio. Codefolio is the static front-end website & CMS that displays your folio to the public and allows you to manage it's content. Codefolio API is a RESTful API server that performs CRUD operations on data requested by your Codefolio site.

#### Demo
- [View Codefolio preview](https://goo.gl/photos/fqhDKEvH9RTejUzY9)

#### Requirements
- npm v3+ & node v4+
- [Codefolio API](https://github.com/msmfsd/codefolio-api)
- Modern browser ie. Chrome, FF, Safari, IE10+, iOS, Android

#### Getting started
1. Clone this repo with ```git clone https://github.com/msmfsd/codefolio.git```
2. Open directory
3. Run ```npm install```
4. Remove existing git directory with ```rm -rf .git```
5. Make your own .git with ```git init```

#### Configuration
1. Open the root file ***config.js***
2. Follow the instructions carefully in the comments of the file

#### Start dev server
1. Ensure your local Codefolio API server is configured and running
2. Run ```npm run start``` command
3. Open browser at [http://localhost:3000/](http://localhost:3000/)

#### Edit content using the CMS
1. Create your administrator at [http://localhost:3000/register](http://localhost:3000/register)
2. Login and start editing your folio using the CMS at [http://localhost:3000/admin](http://localhost:3000/admin)

#### Build production bundle
1. Ensure the config.js file has your correct API_PROD_URL
2. Run ```npm run build``` command
3. Follow the [Codefolio + Codefolio API Guide](https://github.com/msmfsd/codefolio-guide) to publish your folio to a production server

#### Customize
- Feel free to customize the source code to suit your needs
- I recommend you install [Redux Devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) to your browser
- NOTE: In development environment the admin forms will output React Unknown props warnings in the browser inspector console, they are caused by current stable ReduxForm/React versions. These do not effect the application, can be ignored and will not appear in your production bundle.

#### Contributing
Feel free to open an issue or post a pull request

#### License
MIT License
