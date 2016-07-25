/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../editProfile'
import appInitialState from '../../store/initial-state'

/**
 * TEST EDIT PROFILE REDUCER
 */
describe('edit profile reducer', () => {
  //initial state
  const initialState = appInitialState.editProfile
  // EDIT_PROFILE
  it('Handles EDIT_PROFILE', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROFILE',
      payload: {
        editProfileLoading: true,
        editProfileSuccess: null,
        editProfileErrMessage: null,
        editProfileError: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProfileLoading: true,
      editProfileSuccess: null,
      editProfileErrMessage: null,
      editProfileError: null
    }))
  })
  // EDIT_PROFILE_SUCCESS
  it('Handles EDIT_PROFILE_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'EDIT_PROFILE_SUCCESS',
      payload: {
        editProfileLoading: false,
        editProfileErrMessage: null,
        editProfileError: null,
        editProfileSuccess: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProfileLoading: false,
      editProfileErrMessage: null,
      editProfileError: null,
      editProfileSuccess: true
    }))
  })
  // EDIT_PROFILE_FAIL
  it('Handles EDIT_PROFILE_FAIL', () => {
    const error = 'Some Error'
    const newState = reducer(initialState, {
      type: 'EDIT_PROFILE_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      editProfileErrMessage: 'Some Error',
      editProfileLoading: false,
      editProfileError: true,
      editProfileSuccess: null
    }))
  })

})
