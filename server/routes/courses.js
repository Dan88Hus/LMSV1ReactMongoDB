 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin, isInstructor} = require('../middlewares/index')

//import controllers
const {uploadImage, removeImage, create,
    read} = require('../controllers/courses')


//
router.post('/course/upload-image', uploadImage)
router.post("/course/remove-image", removeImage)
router.post("/course", requireSignin, isInstructor, create)
router.get("/course/:slug", read)

module.exports = router