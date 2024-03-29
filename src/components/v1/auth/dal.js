'use strict'
const prisma = require('../../../services/prisma')
const { handleError } = require('../../../utils/utils')

/**
 * Sirve para buscar usuarios basandonos en el ID
 * @param {Number} id - Es el id del usuario 
 * @returns Regresa el usuario encontrado, sino no lo encuentra regresa `null`
 */
exports.findById = async (id) => {
  let response = undefined

  try {
    response = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      }
    })
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}

/**
 * Sirve para buscar users basandonos en los atributos que pasas
 * @param {Object} opts - Es el objeto con los atributos a buscar
 * @returns Regresa el user encontrado, sino no lo encuentra regresa `null`
 */
exports.findBy = async (opts) => {
  let payload = undefined

  try {
    payload = await prisma.user.findFirst({
      where: opts
    })
  } catch (error) {
    handleError(error)
    payload = { msg: error.message }
  }

  return payload
}

/**
 * Regresa todos los Users
 * @returns Regresa todos los Users
 */
exports.getAll = async () => {
  let response = undefined

  try {
    response = await prisma.user.findMany()
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}

/**
 * Crear un User en la Base de Datos
 * @param {Object} user - El User a crear 
 * @returns Regresa el User creado
 */
exports.save = async (user) => {

  let response = undefined

  try {
    if (user.id === undefined) {
      response = await prisma.user.create({
        data: user
      })
    } else {
      response = await prisma.user.update({
        data: user,
        where: {
          id: user.id
        }
      })
    }
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}

/**
 * Elimina un User basado en su ID
 * @param {Number} id - El ID del User a eliminar
 * @returns Regresa el User eliminado
 */
exports.deleteById = async (id) => {
  let response = undefined

  try {
    response = await prisma.user.delete({ where: { id } })
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}
