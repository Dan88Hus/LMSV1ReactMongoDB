 
const express = require('express')

const router = express.Router()

//middlewares 
const {requireSignin} = require('../middlewares/index')

//import controllers
// const {createOrUpdateUser, currentUser} = require('../controllers/auth')
const {register, login, logout, currentUser} = require('../controllers/auth')


//
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get("/current-user", requireSignin, currentUser)


// router.post('/create-or-update-user', authCheck, createOrUpdateUser);
// router.post('/current-user', authCheck, currentUser);
// router.post('/current-admin', authCheck, adminCheck, currentUser);


module.exports = router