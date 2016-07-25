/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
const initialState = {
  profile: { loading: false, hasLoaded: false, error: null, errMesage: null, data: {}, editProfileLoading: false, editProfileErrMessage: null, editProfileError: null, editProfileSuccess: null },
  projects: { loading: false, hasLoaded: false, error: null, errMesage: null, data: [] },
  admin: { editAdminLoading: false, editAdminErrMessage: null, editAdminError: null },
  auth: {
    token: null,
    username: '',
    lastLoggedIn: null,
    authLoading: false,
    errMessage: null,
    error: null,
    logoutLoading: false,
    logoutErrMessage: null,
    logoutError: null,
    registerLoading: false,
    registerErrMessage: null,
    registerError: null,
    registerSuccess: null,
    forgotLoading: false,
    forgotErrMessage: null,
    forgotError: null,
    forgotSuccess: null,
    resetLoading: false,
    resetFail: null,
    resetErrMessage: null,
    resetError: null,
    resetSuccess: null
  }
}

export default initialState
