const express = require('express')
const {
    logInUser,
    signUpUser
} = require('../controllers/userController')

const router = express.Router()

router.post('/login', logInUser)

router.post('/signup', signUpUser)

module.exports = router
