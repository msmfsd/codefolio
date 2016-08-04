# Codefolio [![Build Status](https://travis-ci.com/msmfsd/codefolio.svg?token=pQuZQVJCHi2ifpjKbzd7&branch=master)](https://travis-ci.com/msmfsd/codefolio)

> Codefolio is the static HTML/CSS/JS application for building your developer online folio website with Codefolio & Codefolio API

#### Requirements
- npm v3+ & node v4+ (v6 recommended)
- Codefolio API - [get it here](https://github.com/msmfsd/codefolio-api)

## Getting started
1. Clone this repo with ```git clone https://github.com/msmfsd/codefolio.git```
2. Open directory
3. Run ```npm install```
4. * Remove existing git directory with ```rm -rf .git```
5. Make your own .git with ```git init```

## Start dev server
1. Ensure your development Codefolio API server is running - [see here](#apiguide)
2. Update cf.config.js API_URL/API_KEY from your development Codefolio API server
3. [Install Redux Devtools Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
4. Run ```npm run start``` command
5. Open browser at [http://localhost:3000/](http://localhost:3000/)

## Build bundle for production server
1. Ensure your production Codefolio API server is running - [see here](#apiguide)
2. Update config/config.js API_URL/API_KEY from your production Codefolio API server
3. Run ```npm run build``` command
4. Upload contents the dist folder to your production server
5. To ensure URL routes and browser history will work on your server OS [follow this guide](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server)

##### <a name="apiguide"></a>How to create your Codefolio API site to connect this Codefolio application
1. Install Codefolio API - it can be found here: [Codefolio API](https://github.com/msmfsd/codefolio-api)
2. Follow the Codefolio API setup guide in the Codefolio API Readme


> NOTE: Codefolio & Codefolio API are seperate projects that connect with each other to create your developer folio website. This static front-end application connects to your Codefolio API - a RESTful API server built with NodeJS that performs CRUD operations on data requested by your Codefolio website. The API and front-end application are separated for faster page loading, security and best practice, [see this article for reasoning](https://medium.com/@keithwhor/how-to-build-a-single-page-application-web-stack-that-works-the-baa-architecture-25c1ad941097#.b1pvnyigl).

>Locally you can run both servers on different localhost ports: say your Codefolio site is on localhost:3000 and this API is on localhost: 8080. For production you will need 2 public server endpoints and some knowledge of server admin could be advantageous. An example live setup could be:

> Codefolio API - Upload to your AWS Ubuntu instance with Nginx/Node/MongoDB
> Codefolio - Upload to your plain old LAMP server

## Contributing
Feel free to open issue or post pull request

All contributions are appreciated!

## License
MIT License
