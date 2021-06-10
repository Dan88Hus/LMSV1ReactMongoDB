 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
// const {createOrUpdateUser, currentUser} = require('../controllers/auth')
const {register, login, logout, currentUser
    ,sendTestEmail, forgotPassword, resetPassword} = require('../controllers/auth')


//
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get("/current-user", requireSignin, currentUser)
router.get("/send-email", sendTestEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)


// router.post('/create-or-update-user', authCheck, createOrUpdateUser);
// router.post('/current-user', authCheck, currentUser);
// router.post('/current-admin', authCheck, adminCheck, currentUser);


module.exports = router