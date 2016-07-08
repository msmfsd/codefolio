/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
/**
 * Method to create stores based on a set of passed
 * reducers
 * @param initialState
 * @returns {*}
 */
export default function configureStore (initialState) {

  const middleware = applyMiddleware(thunk)

  const createStoreWithMiddleware = compose(
    middleware,
    window.devToolsExtension && window.devToolsExtension()
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
