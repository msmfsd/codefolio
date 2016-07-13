/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-console:0 */
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config')
var app = express()
var compiler = webpack(config)
var port = 3000

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'src/assets/public')))
app.use(require('webpack-hot-middleware')(compiler))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})
app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Dev Server')
  console.log(`🌎  Listening on port ${port}`)
})
