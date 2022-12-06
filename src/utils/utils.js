'use strict'

exports.isEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj[key] === "" || obj[key] === 0 || obj[key] === undefined || obj[key] === null || obj[key].length === 0) {
      return true
    }
  }

  return false
}

exports.CleaningEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj[key] === "") {
      delete data[key]
    }
  }

  return obj
}

exports.getUpdateFields = (arr) => {
  let update = []

  if (arr === undefined || arr === null || arr.length === 0) {
    return undefined
  }

  for (const n of arr) {
    let { id, ...data } = n

    const obj = {
      where: {
        id,
      },
      data
    }

    update.push(obj)
  }

  return update
}

exports.parseDate = (str) => {

  if (str === undefined || str === null || str === "") {
    return undefined
  }

  return new Date(str).toISOString()
}
