/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
require('babel-core/register')
if (process.env.NODE_ENV === 'production') {
  require('./server.prod')
} else {
  require('./server.dev')
}
