/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/* eslint no-console:0 */
import express from 'express'
import path from 'path'
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'))
})
app.listen(port, (error) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log('Production Server')
  return console.info(`🌎  Listening on port ${port}`)
})
