 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
const {uploadImage, removeImage} = require('../controllers/courses')


//
router.post('/course/upload-image', uploadImage)
router.post("/course/remove-image", removeImage)


module.exports = router