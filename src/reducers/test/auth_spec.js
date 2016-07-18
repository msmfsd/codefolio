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
      authLoading: false
    }
    const newState = reducer(initialState, {
      type: 'AUTH',
      payload: 'email@email.com'
    })
    expect(newState).to.eql({
      authLoading: true,
      username: 'email@email.com'
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
      authLoading: false
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
      logoutLoading: false
    })
  })
  // REGISTER
  it('Handles REGISTER', () => {
    const initialState = {
      registerLoading: false
    }
    const newState = reducer(initialState, {
      type: 'REGISTER'
    })
    expect(newState).to.eql({
      registerLoading: true
    })
  })
  // REGISTER_SUCCESS
  it('Handles REGISTER_SUCCESS', () => {
    const initialState = {
      registerLoading: true,
      registerErrMessage: null,
      registerError: null,
      registerSuccess: null
    }
    const newState = reducer(initialState, {
      type: 'REGISTER_SUCCESS'
    })
    expect(newState).to.eql({
      registerLoading: false,
      registerErrMessage: null,
      registerError: null,
      registerSuccess: true
    })
  })
  // REGISTER_FAIL
  it('Handles REGISTER_FAIL', () => {
    const initialState = {
      registerLoading: true,
      registerErrMessage: null,
      registerError: null,
      registerSuccess: null
    }
    const error = 'REGISTER Error'
    const newState = reducer(initialState, {
      type: 'REGISTER_FAIL',
      payload: error
    })
    expect(newState).to.eql({
      registerErrMessage: error,
      registerError: true,
      registerLoading: false,
      registerSuccess: false
    })
  })
  // FORGOT
  it('Handles FORGOT', () => {
    const initialState = {
      forgotLoading: false
    }
    const newState = reducer(initialState, {
      type: 'FORGOT'
    })
    expect(newState).to.eql({
      forgotLoading: true
    })
  })
  // FORGOT_SUCCESS
  it('Handles FORGOT_SUCCESS', () => {
    const initialState = {
      forgotLoading: true,
      forgotErrMessage: null,
      forgotError: null,
      forgotSuccess: null
    }
    const newState = reducer(initialState, {
      type: 'FORGOT_SUCCESS'
    })
    expect(newState).to.eql({
      forgotLoading: false,
      forgotErrMessage: null,
      forgotError: null,
      forgotSuccess: true
    })
  })
  // FORGOT_FAIL
  it('Handles FORGOT_FAIL', () => {
    const initialState = {
      forgotLoading: true,
      forgotErrMessage: null,
      forgotError: null,
      forgotSuccess: null
    }
    const error = 'FORGOT Error'
    const newState = reducer(initialState, {
      type: 'FORGOT_FAIL',
      payload: error
    })
    expect(newState).to.eql({
      forgotErrMessage: error,
      forgotError: true,
      forgotLoading: false,
      forgotSuccess: false
    })
  })
  // RESET
  it('Handles RESET', () => {
    const initialState = {
      resetLoading: false
    }
    const newState = reducer(initialState, {
      type: 'RESET'
    })
    expect(newState).to.eql({
      resetLoading: true
    })
  })
  // RESET_SUCCESS
  it('Handles RESET_SUCCESS', () => {
    const initialState = {
      resetLoading: true,
      resetErrMessage: null,
      resetError: null,
      resetSuccess: null
    }
    const newState = reducer(initialState, {
      type: 'RESET_SUCCESS'
    })
    expect(newState).to.eql({
      resetLoading: false,
      resetErrMessage: null,
      resetError: null,
      resetSuccess: true
    })
  })
  // RESET_FAIL
  it('Handles RESET_FAIL', () => {
    const initialState = {
      resetLoading: true,
      resetErrMessage: null,
      resetError: null,
      resetSuccess: null
    }
    const error = 'RESET Error'
    const newState = reducer(initialState, {
      type: 'RESET_FAIL',
      payload: error
    })
    expect(newState).to.eql({
      resetErrMessage: error,
      resetError: true,
      resetLoading: false,
      resetSuccess: false
    })
  })


})
