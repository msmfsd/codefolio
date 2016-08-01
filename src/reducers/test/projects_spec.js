/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../projects'
import appInitialState from '../../store/initial-state'

/**
 * TEST PROJECTS REDUCER
 */
describe('projects reducer', () => {
  //initial state
  const initialState = appInitialState.projects
  // FETCH_PROJECTS_REQUEST
  it('Handles FETCH_PROJECTS_REQUEST', () => {
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_REQUEST',
      payload: {
        loading: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: true,
      error: null,
      errMessage: null
    }))
  })
  // FETCH_PROJECTS_RESULT
  it('Handles FETCH_PROJECTS_RESULT', () => {
    const projects = [
      { name: 'Some Project' },
      { name: 'Another Project' }
    ]
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_RESULT',
      payload: projects
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      hasLoaded: true,
      error: null,
      errMessage: null,
      data: projects
    }))
  })
  // FETCH_PROJECTS_ERROR
  it('Handles FETCH_PROJECTS_ERROR', () => {
    const error = { message: 'API Error' }
    const newState = reducer(initialState, {
      type: 'FETCH_PROJECTS_ERROR',
      payload: error.message
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      hasLoaded: false,
      error: true,
      errMessage: 'API Error'
    }))
  })
  // DELETE_PROJECT_REQUEST
  it('Handles DELETE_PROJECT_REQUEST', () => {
    const newState = reducer(initialState, {
      type: 'DELETE_PROJECT_REQUEST',
      payload: {
        loading: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: true,
      error: null,
      errMessage: null
    }))
  })
  // DELETE_PROJECT_RESULT
  it('Handles DELETE_PROJECT_RESULT', () => {
    const newState = reducer(initialState, {
      type: 'DELETE_PROJECT_RESULT'
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      error: null,
      errMessage: null
    }))
  })
  // DELETE_PROJECT_FAIL
  it('Handles DELETE_PROJECT_FAIL', () => {
    const error = { message: 'API Error' }
    const newState = reducer(initialState, {
      type: 'DELETE_PROJECT_FAIL',
      payload: error.message
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      error: true,
      errMessage: 'API Error'
    }))
  })

})
