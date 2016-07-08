/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-console:0 */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from './webpack.config'
const app = express()
const compiler = webpack(config)
const port = 3000

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))
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
