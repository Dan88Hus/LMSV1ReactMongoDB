const express = require('express')
const formidable = require("express-formidable")

const router = express.Router()

//middlewares 
const {requireSignin, isInstructor, isEnrolled}  = require('../middlewares/index')

//import controllers
const {uploadImage, removeImage, create,
    read, uploadVideo, removeVideo, addLesson,
     update, removeLesson, updateLesson,
     publishCourse, unpublishCourse, courses, checkEnrollment,
     freeEnrollment, paidEnrollment,
     stripeSuccess, userCourses, markCompleted, listcompleted} = require('../controllers/courses')
const completed = require('../models/completed')

//publish/Unpublish
router.put("/course/publish/:courseId", requireSignin, publishCourse)
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse)
router.get("/courses/", courses)

//
router.post('/course/upload-image', uploadImage)
router.post("/course/remove-image", removeImage)
router.post("/course", requireSignin, isInstructor, create)
router.get("/course/:slug", read)
router.post("/course/video-upload/:instructorId", requireSignin, formidable(), uploadVideo )
router.post("/course/video-remove/:instructorId",requireSignin, removeVideo )
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson)
router.put("/course/:slug", requireSignin, update)
router.put("/course/:slug/:lessonId", requireSignin, removeLesson)
router.put("/course/lesson/:slug/:instructorId", requireSignin, updateLesson)
router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment)
router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment)
router.post("/paid-enrollment/:courseId", requireSignin, paidEnrollment)
router.get("/stripe-success/:courseId", requireSignin, stripeSuccess)
router.get("/user-courses", requireSignin, userCourses )
router.get("/user/course/:slug", requireSignin, isEnrolled, read)
//mark completed 

router.post("/mark-completed", requireSignin, markCompleted)
router.post("/list-completed", requireSignin, listcompleted)
module.exports = router