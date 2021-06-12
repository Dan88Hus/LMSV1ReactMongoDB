 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
const {uploadImage} = require('../controllers/courses')


//
router.post('/course/upload-image', uploadImage)


module.exports = router