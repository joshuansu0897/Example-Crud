'use strict'

exports.isEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === "" || obj[key] === 0 || obj[key].length === 0) {
      return true
    }
  }

  return false
}

exports.CleaningEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
      delete data[key]
    }
  }

  return obj
}

exports.parseDate = (str) => {

  if (str === undefined || str === null || str === "") {
    return undefined
  }

  return new Date(str).toISOString()
}
