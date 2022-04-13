const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('movements', {
    amount: 1,
    description: 1,
    date: 1
  })
  res.json(users)
})

usersRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id).populate('movements', {
      amount: 1,
      description: 1,
      date: 1
    })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
