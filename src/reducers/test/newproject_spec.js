/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import { expect } from 'chai'
import update from 'react/lib/update'
import reducer from '../newProject'
import appInitialState from '../../store/initial-state'

/**
 * TEST PROJECTS REDUCER
 */
describe('new project reducer', () => {
  //initial state
  const initialState = appInitialState.newProject
  // NEW_PROJECT
  it('Handles NEW_PROJECT', () => {
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT',
      payload: {
        newProjectLoading: true,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectLoading: true,
      newProjectErrMessage: null,
      newProjectError: null,
      newProjectSuccess: null
    }))
  })
  // NEW_PROJECT_SUCCESS
  it('Handles NEW_PROJECT_SUCCESS', () => {
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_SUCCESS',
      payload: {
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectLoading: false,
      newProjectErrMessage: null,
      newProjectError: null,
      newProjectSuccess: true
    }))
  })

  // NEW_PROJECT_FAIL
  it('Handles NEW_PROJECT_FAIL', () => {
    const error = 'Some Error'
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_FAIL',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectLoading: false,
      newProjectErrMessage: error,
      newProjectError: true,
      newProjectSuccess: null
    }))
  })

  // NEW_PROJECT_RESET
  it('Handles NEW_PROJECT_RESET', () => {
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_RESET',
      payload: {
        newProjectFilesLoading: false,
        newProjectFilesMessage: null,
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null,
        name: '',
        role: '',
        description: '',
        client: '',
        viewOrder: 1,
        sticky: 0,
        repoDisplay: 'no',
        repoUrl: '',
        repoUser: '',
        repoName: '',
        codeDisplay: 'no',
        code: '',
        projectTech: [],
        linkWeb: [],
        media: []
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectFilesLoading: false,
      newProjectFilesMessage: null,
      newProjectLoading: false,
      newProjectErrMessage: null,
      newProjectError: null,
      newProjectSuccess: null,
      name: '',
      role: '',
      description: '',
      client: '',
      viewOrder: 1,
      sticky: 0,
      repoDisplay: 'no',
      repoUrl: '',
      repoUser: '',
      repoName: '',
      codeDisplay: 'no',
      code: '',
      projectTech: [],
      linkWeb: [],
      media: []
    }))
  })
  // NEW_PROJECT_UPLOADING_FILES
  it('Handles NEW_PROJECT_UPLOADING_FILES', () => {
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_UPLOADING_FILES',
      payload: {
        newProjectFilesLoading: true,
        newProjectFilesErrMessage: null,
        newProjectFilesError: null,
        newProjectFilesSuccess: null
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectFilesLoading: true,
      newProjectFilesErrMessage: null,
      newProjectFilesError: null,
      newProjectFilesSuccess: null
    }))
  })
  // NEW_PROJECT_UPLOADING_FILES_COMPLETE
  it('Handles NEW_PROJECT_UPLOADING_FILES_COMPLETE', () => {
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_UPLOADING_FILES_COMPLETE',
      payload: {
        newProjectFilesLoading: false,
        newProjectFilesErrMessage: null,
        newProjectFilesError: null,
        newProjectFilesSuccess: true
      }
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectFilesLoading: false,
      newProjectFilesErrMessage: null,
      newProjectFilesError: null,
      newProjectFilesSuccess: true
    }))
  })

  // NEW_PROJECT_UPLOADING_FILES_ERROR
  it('Handles NEW_PROJECT_UPLOADING_FILES_ERROR', () => {
    const error = 'Some Error'
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_UPLOADING_FILES_ERROR',
      payload: error
    })
    expect(newState).to.eql(Object.assign({}, initialState, {
      newProjectFilesLoading: false,
      newProjectFilesErrMessage: error,
      newProjectFilesError: true,
      newProjectFilesSuccess: null
    }))
  })

  // NEW_PROJECT_UPDATE_MEDIA
  it('Handles NEW_PROJECT_UPDATE_MEDIA', () => {
    const filenames = ['img1.png', 'img2.png']
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_UPDATE_MEDIA',
      filenames
    })
    const reducerState = update(initialState, {
      media: { $set: filenames }
    })
    expect(newState).to.eql(reducerState)
  })

  // NEW_PROJECT_ON_PUSH_FIELD_ARRAY
  it('Handles NEW_PROJECT_ON_PUSH_FIELD_ARRAY', () => {
    const fieldName = 'projectTech'
    const fieldValue = 'php'
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_ON_PUSH_FIELD_ARRAY',
      fieldName,
      fieldValue
    })
    const reducerState = update(initialState, {
      [fieldName]: { $push: [fieldValue] }
    })
    expect(newState).to.eql(reducerState)
  })

  // NEW_PROJECT_ON_SPLICE_FIELD_ARRAY
  it('Handles NEW_PROJECT_ON_SPLICE_FIELD_ARRAY', () => {
    const fieldName = 'projectTech'
    const index = 0
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_ON_SPLICE_FIELD_ARRAY',
      fieldName,
      index
    })
    const reducerState = update(initialState, {
      [fieldName]: {$splice: [[index, 1]]}
    })
    expect(newState).to.eql(reducerState)
  })

  // NEW_PROJECT_ADD_LINK
  it('Handles NEW_PROJECT_ADD_LINK', () => {
    const linkGroup = 'linkWeb'
    const linkName = 'linktosite.com'
    const linkUrl = 'http://linktosite.com'
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_ADD_LINK',
      linkGroup,
      linkName,
      linkUrl
    })
    const reducerState = update(initialState, {
      [linkGroup]: {$push: [{ name: linkName, url: linkUrl }]}
    })
    expect(newState).to.eql(reducerState)
  })

  // NEW_PROJECT_REMOVE_LINK
  it('Handles NEW_PROJECT_REMOVE_LINK', () => {
    const linkGroup = 'linkWeb'
    const index = 0
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_REMOVE_LINK',
      linkGroup,
      index
    })
    const reducerState = update(initialState, {
      [linkGroup]: {$splice: [[index, 1]]}
    })
    expect(newState).to.eql(reducerState)
  })

  // NEW_PROJECT_UPDATE_FIELD
  it('Handles NEW_PROJECT_UPDATE_FIELD', () => {
    const fieldName = 'projectTech'
    const fieldValue = 'php'
    const newState = reducer(initialState, {
      type: 'NEW_PROJECT_UPDATE_FIELD',
      fieldName,
      fieldValue
    })
    const reducerState = update(initialState, {
      [fieldName]: { $set: fieldValue }
    })
    expect(newState).to.eql(reducerState)
  })

})
