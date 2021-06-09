 
const express = require('express')

const router = express.Router()

//middlewares 
// const {authCheck, adminCheck} = require('../middlewares/auth')

//import controllers
// const {createOrUpdateUser, currentUser} = require('../controllers/auth')
const {register, login, logout} = require('../controllers/auth')


//
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)


// router.post('/create-or-update-user', authCheck, createOrUpdateUser);
// router.post('/current-user', authCheck, currentUser);
// router.post('/current-admin', authCheck, adminCheck, currentUser);


module.exports = router