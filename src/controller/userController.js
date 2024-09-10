import express from 'express'
import userService from '../service/userService.js'

const userController = express.Router()

userController.post('/api/rooms', userService.createRoom)
userController.post('/api/bookings', userService.booking)
userController.get('/api/rooms', userService.listCustomer)
userController.get('/api/customers', userService.bookingData)
userController.put('/api/customers/:customerName', userService.bookingFrequency)

export default userController