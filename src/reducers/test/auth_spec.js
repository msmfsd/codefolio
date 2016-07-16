/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../auth'

/**
 * TEST PROFILE REDUCER
 */
describe('auth reducer', () => {
  // FETCH_PROFILE_REQUEST
  it('Handles AUTH', () => {
    const initialState = {
      username: '',
      authLoading: false,
      authFailed: false
    }
    const newState = reducer(initialState, {
      type: 'AUTH',
      payload: 'email@email.com'
    })
    expect(newState).to.eql({
      authLoading: true,
      username: 'email@email.com',
      authFailed: null
    })
  })
  // FETCH_PROFILE_RESULT
  it('Handles AUTH_SUCCESS', () => {
    const initialState = {
      token: null,
      lastLoggedIn: null,
      authLoading: false,
      errMessage: null,
      error: null
    }
    const newState = reducer(initialState, {
      type: 'AUTH_SUCCESS',
      payload: {
        token: 'AAAABBBBB',
        lastLoggedIn: '20120608'
      }
    })
    expect(newState).to.eql({
      token: 'AAAABBBBB',
      lastLoggedIn: '20120608',
      authLoading: false,
      errMessage: null,
      error: null
    })
  })
  // AUTH_FAIL
  it('Handles AUTH_FAIL', () => {
    const initialState = {
      authLoading: false,
      authFailed: false,
      errMessage: null,
      error: null
    }
    const error = 'AUTH Error'
    const newState = reducer(initialState, {
      type: 'AUTH_FAIL',
      payload: error
    })
    expect(newState).to.eql({
      errMessage: error,
      error: true,
      authLoading: false,
      authFailed: true
    })
  })
  // AUTH_LOGOUT
  it('Handles AUTH_LOGOUT', () => {
    const initialState = {
      logoutLoading: false
    }
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT'
    })
    expect(newState).to.eql({
      logoutLoading: true
    })
  })
  // AUTH_LOGOUT_SUCCESS
  it('Handles AUTH_LOGOUT_SUCCESS', () => {
    const initialState = {
      token: null,
      username: '',
      lastLoggedIn: null,
      logoutLoading: false,
      logoutErrMessage: null,
      logoutError: null
    }
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT_SUCCESS'
    })
    expect(newState).to.eql({
      token: null,
      username: null,
      lastLoggedIn: null,
      logoutLoading: false,
      logoutErrMessage: null,
      logoutError: null
    })
  })
  // AUTH_LOGOUT_FAIL
  it('Handles AUTH_LOGOUT_FAIL', () => {
    const initialState = {
      logoutLoading: false,
      logoutFail: null,
      logoutErrMessage: null,
      logoutError: null
    }
    const error = 'AUTH Error'
    const newState = reducer(initialState, {
      type: 'AUTH_LOGOUT_FAIL',
      payload: error
    })
    expect(newState).to.eql({
      logoutErrMessage: error,
      logoutError: true,
      logoutLoading: false,
      logoutFail: true
    })
  })

})
