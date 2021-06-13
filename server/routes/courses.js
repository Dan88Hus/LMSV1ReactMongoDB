const express = require('express')
const formidable = require("express-formidable")

const router = express.Router()

//middlewares 
const {requireSignin, isInstructor} = require('../middlewares/index')

//import controllers
const {uploadImage, removeImage, create,
    read, uploadVideo} = require('../controllers/courses')


//
router.post('/course/upload-image', uploadImage)
router.post("/course/remove-image", removeImage)
router.post("/course", requireSignin, isInstructor, create)
router.get("/course/:slug", read)
router.post("/course/video-upload", requireSignin, formidable(), uploadVideo )

module.exports = router