/*!
 * Codefolio
 * Copyright(c) 2016 MSMFSD
 * MIT Licensed
 */
/*eslint-disable*/
const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]

export function email (value) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
}

export function required (value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
  }
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
}

export function alphaNumeric (value) {
  if(typeof value !== 'undefined' && !value.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)) {
    return 'Must contain a combination of numbers and letters only'
  }
}

export function oneOf (enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match (field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Passwords do not match'
      }
    }
  }
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]))
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
