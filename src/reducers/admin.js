/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
import {
  EDIT_ADMIN,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_FAIL
} from '../actions/index'

const admin = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ADMIN:
      return Object.assign({}, state, {
        editAdminLoading: true,
        editAdminErrMessage: null,
        editAdminError: null
      })
    case EDIT_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        editAdminLoading: false,
        editAdminErrMessage: null,
        editAdminError: null
      })
    case EDIT_ADMIN_FAIL:
      return Object.assign({}, state, {
        editAdminErrMessage: action.payload,
        editAdminError: true,
        editAdminLoading: false
      })
    default:
      return state
  }
}

export default admin
