/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import update from 'react/lib/update'
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_RESULT,
  FETCH_PROJECTS_ERROR,
  NEW_PROJECT,
  NEW_PROJECT_UPLOADING_FILES,
  NEW_PROJECT_UPLOADING_FILES_COMPLETE,
  NEW_PROJECT_UPLOADING_FILES_ERROR,
  NEW_PROJECT_RESET,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  NEW_PROJECT_UPDATE_MEDIA,
  NEW_PROJECT_ON_SPLICE_FIELD_ARRAY,
  NEW_PROJECT_ON_PUSH_FIELD_ARRAY,
  NEW_PROJECT_ADD_LINK,
  NEW_PROJECT_REMOVE_LINK,
  UPDATE_NEW_PROJECT_FIELD
} from '../actions/index'

const projects = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        errMesage: null
      })
    case FETCH_PROJECTS_RESULT:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: true,
        error: null,
        errMesage: null,
        data: action.payload
      })
    case FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        hasLoaded: false,
        error: true,
        errMesage: action.payload
      })
    case NEW_PROJECT:
      return Object.assign({}, state, {
        newProjectLoading: true,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null
      })
    case NEW_PROJECT_UPLOADING_FILES:
      return Object.assign({}, state, {
        newProjectLoadingFiles: true,
        newProjectLoadingFilesErrMessage: null,
        newProjectLoadingFilesError: null,
        newProjectLoadingFilesSuccess: null
      })
    case NEW_PROJECT_UPLOADING_FILES_COMPLETE:
      // TODO update media
      return Object.assign({}, state, {
        newProjectLoadingFiles: false,
        newProjectLoadingFilesErrMessage: null,
        newProjectLoadingFilesError: null,
        newProjectLoadingFilesSuccess: true
      })
    case NEW_PROJECT_UPLOADING_FILES_ERROR:
      return Object.assign({}, state, {
        newProjectLoadingFiles: false,
        newProjectLoadingFilesErrMessage: action.payload,
        newProjectLoadingFilesError: true,
        newProjectLoadingFilesSuccess: null
      })
    case NEW_PROJECT_RESET:
      return Object.assign({}, state, {
        newProjectLoadingFiles: false,
        newProjectLoadingFilesMessage: null,
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: null,
        newProject: {
          name: '',
          role: '',
          description: '',
          client: '',
          active: 1,
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
    case NEW_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: null,
        newProjectError: null,
        newProjectSuccess: true
      })
    case NEW_PROJECT_FAIL:
      return Object.assign({}, state, {
        newProjectLoading: false,
        newProjectErrMessage: action.payload,
        newProjectError: true,
        newProjectSuccess: null
      })
    case NEW_PROJECT_UPDATE_MEDIA:
      return update(state, {
        newProject: {
          media: { $set: action.filenames }
        }
      })
    case NEW_PROJECT_ON_PUSH_FIELD_ARRAY:
      return update(state, {
        newProject: {
          [action.fieldName]: { $push: [action.fieldValue] }
        }
      })
    case NEW_PROJECT_ON_SPLICE_FIELD_ARRAY:
      return update(state, {
        newProject: {
          [action.fieldName]: {$splice: [[action.index, 1]]}
        }
      })
    case NEW_PROJECT_ADD_LINK:
      return update(state, {
        newProject: {
          [action.linkGroup]: {$push: [{ name: action.linkName, url: action.linkUrl }]}
        }
      })
    case NEW_PROJECT_REMOVE_LINK:
      return update(state, {
        newProject: {
          [action.linkGroup]: {$splice: [[action.index, 1]]}
        }
      })
    case UPDATE_NEW_PROJECT_FIELD:
      return update(state, {
        newProject: {
          [action.fieldName]: { $set: action.fieldValue }
        }
      })
    default:
      return state
  }
}

export default projects
