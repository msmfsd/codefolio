/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
const hours = 48
const storageData = {
  token: 'token',
  username: 'username',
  lastLoggedIn: 'lastLoggedIn',
  storageTokenExpires: 'storageTokenExpires'
}

/**
 * Ensure support for browser storage
 * @return boolean
 */
export function localStorageSupported () {
  const cf = 'cf'
  try {
    localStorage.setItem(cf, cf)
    localStorage.removeItem(cf)
    return true
  } catch (e) {
    clearStorage()
    return false
  }
}

/**
 * Set auth to browser storage
 * @param token: string
 * @param lastLoggedIn: string
 * @param username: string
 */
export function setStorage (token, lastLoggedIn, username) {
  localStorage.setItem(storageData.token, token)
  localStorage.setItem(storageData.lastLoggedIn, lastLoggedIn)
  localStorage.setItem(storageData.username, username)
  localStorage.setItem(storageData.storageTokenExpires, new Date().getTime())
}

/**
 * Get auth from browser storage
 * @return storage object or false
 */
export function getStorage () {
  let now = new Date().getTime()
  let storageToken = localStorage.getItem(storageData.token)
  let storageLastLoggedIn = localStorage.getItem(storageData.lastLoggedIn)
  let storageUser = localStorage.getItem(storageData.username)
  let storageTokenExpires = localStorage.getItem(storageData.storageTokenExpires)
  // token exists and not expired?
  if(storageToken !== null && ((now - storageTokenExpires) < hours * 60 * 60 * 1000)) {
    localStorage.setItem(storageData.storageTokenExpires, now)
    return { token: storageToken, lastLoggedIn: storageLastLoggedIn, username: storageUser }
  } else {
    return false
  }
}

/**
 * Clear browser storage
 */
export function clearStorage () {
  localStorage.removeItem(storageData.token)
  localStorage.removeItem(storageData.lastLoggedIn)
  localStorage.removeItem(storageData.username)
  localStorage.removeItem(storageData.storageTokenExpires)
}
