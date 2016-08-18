/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import createLogger from 'redux-logger'
import rootReducer from '../reducers'
/**
 * Method to create stores based on a set of passed
 * reducers
 * @param {object} initialState
 * @return {object} redux store
 */
export default function configureStore (initialState) {
  const middleware = applyMiddleware(thunk)
  const createStoreWithMiddleware = compose(
    middleware,
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
