/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
/**
 * Method to create stores based on a set of passed
 * reducers
 * @param initialState
 * @returns {*}
 */
export default function configureStore (initialState) {

  const logger = createLogger()
  const middleware = applyMiddleware(thunk, logger)

  const createStoreWithMiddleware = compose(
    middleware,
    window.devToolsExtension && window.devToolsExtension()
  )

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)

  return store
}
