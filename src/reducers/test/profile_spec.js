/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../profile'

/**
 * TEST PROFILE REDUCER
 */
describe('profile reducer', () => {
  // FETCH_PROFILE_REQUEST
  it('Handles FETCH_PROFILE_REQUEST', () => {
    const initialState = {
      loading: false,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: {}
    }
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_REQUEST',
      payload: {
        loading: true
      }
    })
    expect(newState).to.eql({
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: {}
    })
  })
  // FETCH_PROFILE_RESULT
  it('Handles FETCH_PROFILE_RESULT', () => {
    const initialState = {
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: {}
    }
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_RESULT',
      payload: {
        loading: false,
        hasLoaded: true,
        data: {
          success: true,
          message: 'Profile found.',
          data: {
            name: 'Steve Wozniak'
          }
        }
      }
    })
    expect(newState).to.eql({
      loading: false,
      hasLoaded: true,
      error: false,
      errMesage: '',
      data: {
        success: true,
        message: 'Profile found.',
        data: {
          name: 'Steve Wozniak'
        }
      }
    })
  })
  // FETCH_PROFILE_ERROR
  it('Handles FETCH_PROFILE_ERROR', () => {
    const initialState = {
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: {}
    }
    const error = { message: 'API Error' }
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_ERROR',
      payload: {
        loading: false,
        hasLoaded: false,
        error: true,
        errMesage: error.message,
        data: {}
      }
    })
    expect(newState).to.eql({
      loading: false,
      hasLoaded: false,
      error: true,
      errMesage: 'API Error',
      data: {}
    })
  })

})
