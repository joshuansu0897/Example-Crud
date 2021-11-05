'use strict'
const router = require('express').Router()
const Post = require('./dal')

router.get('/', async (req, res) => {
  let response = await Post.getAll()
  res.json(response)
})

router.post('/', async (req, res) => {

  let post = {
    title: req.body.title,
    published: req.body.published,
    authorId: req.body.authorId,
    content: req.body.content
  }

  let response = await Post.save(post)

  res.json(response)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let response = await Post.findById(id)
  res.json(response)
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let post = {
    id,
    title: req.body.title,
    published: req.body.published,
    authorId: req.body.authorId,
    content: req.body.content
  }

  let response = await Post.save(post)

  res.json(response)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  let response = await Post.deleteById(id)
  res.json(response)
})

module.exports = router