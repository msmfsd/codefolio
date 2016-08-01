/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import reducer from '../profile'
import appInitialState from '../../store/initial-state'

/**
 * TEST PROFILE REDUCER
 */
describe('profile reducer', () => {
  //initial state
  const initialState = appInitialState.profile
  // FETCH_PROFILE_REQUEST
  it('Handles FETCH_PROFILE_REQUEST', () => {
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_REQUEST',
      payload: {
        loading: true,
        error: null,
        errMessage: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: true,
      error: null,
      errMessage: null
    }))
  })
  // FETCH_PROFILE_RESULT
  it('Handles FETCH_PROFILE_RESULT', () => {
    const data = { name: 'Some name' }
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_RESULT',
      payload: data
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      hasLoaded: true,
      error: null,
      errMessage: null,
      data: data
    }))
  })
  // FETCH_PROFILE_ERROR
  it('Handles FETCH_PROFILE_ERROR', () => {
    const error = { message: 'API Error' }
    const newState = reducer(initialState, {
      type: 'FETCH_PROFILE_ERROR',
      payload: error.message
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      loading: false,
      hasLoaded: false,
      error: true,
      errMessage: 'API Error'
    }))
  })
  // UPDATE_PROFILE_FIELD
  it('Handles UPDATE_PROFILE_FIELD', () => {
    const fieldName = 'bio'
    const fieldValue = '<p>Lorem Ipsum</p>'
    const newState = reducer(initialState, {
      type: 'UPDATE_PROFILE_FIELD',
      fieldName,
      fieldValue
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      data: {
        bio: fieldValue
      }
    }))
  })
  // UPDATE_AVATAR_FIELDS
  it('Handles UPDATE_AVATAR_FIELDS', () => {
    const use = 'gravitarEmail'
    const gravitarEmail = 'email@email.com'
    const customAvatarFile = ''
    initialState.data = {
      avatar: {
        use: '',
        gravitarEmail: ''
      },
      customAvatarFile: ''
    }
    const newState = reducer(initialState, {
      type: 'UPDATE_AVATAR_FIELDS',
      use,
      gravitarEmail,
      customAvatarFile
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      data: {
        avatar: {
          use: use,
          gravitarEmail: gravitarEmail
        },
        customAvatarFile: customAvatarFile
      }
    }))
  })
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
