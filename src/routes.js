const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controller = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/users', validate(validators.User), controller.UserController.store)
routes.post('/sessions', validate(validators.Session), controller.SessionController.store)

routes.use(authMiddleware)

routes.get('/ads', handle(controller.AdController.index))
routes.get('/ads/:id', handle(controller.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controller.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controller.AdController.update))
routes.delete('/ads/:id', handle(controller.AdController.destroy))

routes.post('/purchases', validate(validators.Purchase), handle(controller.PurchaseController.store))

module.exports = routes
