 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
const {makeInstructor } = require('../controllers/instructor')


//
router.post('/make-instructor', requireSignin, makeInstructor)


module.exports = router