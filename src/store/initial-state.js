/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
const initialState = {
  profile: { loading: false, hasLoaded: false, error: false, errMesage: '', data: {} },
  projects: { loading: false, hasLoaded: false, error: false, errMesage: '', data: [] },
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
    registerFail: null,
    registerErrMessage: null,
    registerError: null,
    registerSuccess: null,
    forgotLoading: false,
    forgotFail: null,
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
