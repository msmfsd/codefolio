/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../auth'
import appInitialState from '../../store/initial-state'

/**
 * TEST PROFILE REDUCER
 */
describe('auth reducer', () => {
  //initial state
  const initialState = appInitialState.auth
  // FETCH_PROFILE_REQUEST
  it('Handles AUTH', () => {
    const email = 'email@email.com'
    const newState = reducer(initialState, {
      type: 'AUTH',
      payload: email
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      username: email,
      authLoading: true
    }))
  })
  // FETCH_PROFILE_RESULT
  it('Handles AUTH_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'AUTH_SUCCESS',
      payload: {
        token: 'AAAABBBBB',
        lastLoggedIn: '20120608'
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      token: 'AAAABBBBB',
      lastLoggedIn: '20120608',
      authLoading: false,
      errMessage: null,
      error: null
    }))
  })
  // AUTH_FAIL
  it('Handles AUTH_FAIL', () => {
    const error = 'AUTH Error'
    const newState = reducer(initialState, {
      type: 'AUTH_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      errMessage: error,
      error: true,
      authLoading: false
    }))
  })
  // AUTH_LOGOUT
  it('Handles AUTH_LOGOUT', () => {
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      logoutLoading: true
    }))
  })
  // AUTH_LOGOUT_SUCCESS
  it('Handles AUTH_LOGOUT_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT_SUCCESS'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      token: null,
      username: null,
      lastLoggedIn: null,
      logoutLoading: false,
      logoutErrMessage: null,
      logoutError: null
    }))
  })
  // AUTH_LOGOUT_FAIL
  it('Handles AUTH_LOGOUT_FAIL', () => {
    const error = 'AUTH Error'
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      logoutErrMessage: error,
      logoutError: true,
      logoutLoading: false
    }))
  })
  // REGISTER
  it('Handles REGISTER', () => {
    const newState = reducer(initialState, {
      type: 'REGISTER'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      registerLoading: true
    }))
  })
  // REGISTER_SUCCESS
  it('Handles REGISTER_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'REGISTER_SUCCESS'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      registerLoading: false,
      registerErrMessage: null,
      registerError: null,
      registerSuccess: true
    }))
  })
  // REGISTER_FAIL
  it('Handles REGISTER_FAIL', () => {
    const error = 'REGISTER Error'
    const newState = reducer(initialState, {
      type: 'REGISTER_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      registerErrMessage: error,
      registerError: true,
      registerLoading: false,
      registerSuccess: false
    }))
  })
  // FORGOT
  it('Handles FORGOT', () => {
    const newState = reducer(initialState, {
      type: 'FORGOT'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      forgotLoading: true
    }))
  })
  // FORGOT_SUCCESS
  it('Handles FORGOT_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'FORGOT_SUCCESS'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      forgotLoading: false,
      forgotErrMessage: null,
      forgotError: null,
      forgotSuccess: true
    }))
  })
  // FORGOT_FAIL
  it('Handles FORGOT_FAIL', () => {
    const error = 'FORGOT Error'
    const newState = reducer(initialState, {
      type: 'FORGOT_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      forgotErrMessage: error,
      forgotError: true,
      forgotLoading: false,
      forgotSuccess: false
    }))
  })
  // RESET
  it('Handles RESET_INIT', () => {
    const newState = reducer(initialState, {
      type: 'RESET_INIT'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      resetLoading: true
    }))
  })
  // RESET_SUCCESS
  it('Handles RESET_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'RESET_SUCCESS'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      resetLoading: false,
      resetErrMessage: null,
      resetError: null,
      resetSuccess: true
    }))
  })
  // RESET_FAIL
  it('Handles RESET_FAIL', () => {
    const error = 'RESET Error'
    const newState = reducer(initialState, {
      type: 'RESET_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      resetErrMessage: error,
      resetError: true,
      resetLoading: false,
      resetSuccess: false
    }))
  })


})
