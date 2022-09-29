'use strict'

import express from 'express'
import productsController from '../controllers/productsController.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = express.Router()

router.get('/', userAuth, productsController.list)
router.get('/filter', userAuth, productsController.filterProducts)
router.get('/:product', userAuth, productsController.getProduct)
router.post('/create', userAuth, productsController.createProduct)
router.patch('/update', userAuth, productsController.update)
router.delete('/:product/delete', userAuth, productsController.delete)

export { router as productsRouter }