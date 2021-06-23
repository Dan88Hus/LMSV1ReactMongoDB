 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
const {makeInstructor, getAccountStatus,
    currentInstructor, instructorCourses, studentCount } = require('../controllers/instructor')



//
router.post('/make-instructor', requireSignin, makeInstructor)
router.post("/get-account-status", requireSignin, getAccountStatus)
router.get("/current-instructor", requireSignin, currentInstructor )
router.get("/instructor-courses", requireSignin, instructorCourses)
router.post("/instructor/student-count", requireSignin, studentCount)
module.exports = router