import express from 'express'
import userController from './userController.js'

const controller = express.Router()

controller.use('/book', userController)

export default controller