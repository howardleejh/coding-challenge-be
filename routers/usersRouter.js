'use strict'

import express from 'express'
import usersController from '../controllers/usersController.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = express.Router()

router.post('/profile', userAuth, usersController.getUser)
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.patch('/profile', userAuth, usersController.update)
router.delete('/profile', userAuth, usersController.delete)

export { router as usersRouter }