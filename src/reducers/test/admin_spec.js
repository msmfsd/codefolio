/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../admin'
import appInitialState from '../../store/initial-state'

/**
 * TEST ADMIN REDUCER
 */
describe('admin reducer', () => {
  //initial state
  const initialState = appInitialState.admin
  // EDIT_ADMIN
  it('Handles EDIT_ADMIN', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_ADMIN',
      payload: {
        editAdminLoading: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editAdminLoading: true
    }))
  })
  // EDIT_ADMIN_SUCCESS
  it('Handles EDIT_ADMIN_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_ADMIN_SUCCESS',
      payload: {
        editAdminLoading: false,
        editAdminErrMessage: null,
        editAdminError: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editAdminLoading: false,
      editAdminErrMessage: null,
      editAdminError: null
    }))
  })
  // EDIT_ADMIN_FAIL
  it('Handles EDIT_ADMIN_FAIL', () => {
    const error = 'Admin Error'
    const newState = reducer(initialState, {
      type: 'EDIT_ADMIN_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editAdminErrMessage: error,
      editAdminError: true,
      editAdminLoading: false
    }))
  })

})
