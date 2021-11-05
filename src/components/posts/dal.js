'use strict'
const prisma = require('../../services/prisma')
const { handleError } = require('../../utils/utils')

/**
 * Sirve para buscar Posts basandonos en el ID
 * @param {Number} id - Es el id del Post 
 * @returns Regresa el Post encontrado, sino no lo encuentra regresa `null`
 */
exports.findById = async (id) => {
  let response = undefined

  try {
    response = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}

/**
 * Regresa todos los Posts
 * @returns Regresa todos los Posts
 */
exports.getAll = async () => {
  let response = undefined

  try {
    response = await prisma.post.findMany()
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}

/**
 * Crear un Post en la Base de Datos
 * @param {Object} post - El Post a crear 
 * @returns Regresa el Post creado
 */
exports.save = async (post) => {

  let response = undefined

  try {
    if (post.id === undefined) {
      response = await prisma.post.create({
        data: post
      })
    } else {
      response = await prisma.post.update({
        data: post,
        where: {
          id: post.id
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
 * Elimina un Post basado en su ID
 * @param {Number} id - El ID del Post a eliminar
 * @returns Regresa el Post eliminado
 */
exports.deleteById = async (id) => {
  let response = undefined

  try {
    response = await prisma.post.delete({ where: { id } })
  } catch (error) {
    handleError(error)
    response = { msg: error.message }
  }

  return response
}
