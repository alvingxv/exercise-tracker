const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.post('/', controller.createUser)
router.get('/', controller.getAllUsers)
router.post(`/:_id/exercises`, controller.createExercises)
router.get(`/:_id/logs`, controller.getExercises)
module.exports = { router }