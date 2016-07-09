/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../projects'

/*
projects: {
  loading: false,
  hasLoaded: false,
  error: false,
  errMesage: '',
  data: []
}
*/

/**
 * TEST PROJECTS REDUCER
 */
describe('projects reducer', () => {
  // FETCH_PROJECTS_REQUEST
  it('Handles FETCH_PROJECTS_REQUEST', () => {
    const initialState = {
      loading: false,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: []
    }
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_REQUEST',
      payload: {
        loading: true
      }
    })
    expect(newState).to.eql({
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: []
    })
  })
  // FETCH_PROJECTS_RESULT
  it('Handles FETCH_PROJECTS_RESULT', () => {
    const initialState = {
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: []
    }
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_RESULT',
      payload: {
        loading: false,
        hasLoaded: true,
        data: [
          { name: 'Some Project' },
          { name: 'Another Project' }
        ]
      }
    })
    expect(newState).to.eql({
      loading: false,
      hasLoaded: true,
      error: false,
      errMesage: '',
      data: [
        { name: 'Some Project' },
        { name: 'Another Project' }
      ]
    })
  })
  // FETCH_PROJECTS_ERROR
  it('Handles FETCH_PROJECTS_ERROR', () => {
    const initialState = {
      loading: true,
      hasLoaded: false,
      error: false,
      errMesage: '',
      data: []
    }
    const error = { message: 'API Error' }
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_ERROR',
      payload: {
        loading: false,
        hasLoaded: false,
        error: true,
        errMesage: error.message,
        data: []
      }
    })
    expect(newState).to.eql({
      loading: false,
      hasLoaded: false,
      error: true,
      errMesage: 'API Error',
      data: []
    })
  })

})
