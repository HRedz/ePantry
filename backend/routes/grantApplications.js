const express = require('express')
const {
    getGrantApplication,
    getGrantApplications,
    postGrantApplication,
    approveGrantApplication,
    rejectGrantApplication
} = require('../controllers/grantApplicationController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)

// id is id of application being viewed
router.get('/view/:id', getGrantApplication)

router.get('/view', getGrantApplications)

// here id is id of grant applying to
router.post('/apply/:id', postGrantApplication)

router.patch('/approve/:id', approveGrantApplication)
router.patch('/reject/:id', rejectGrantApplication)

module.exports = router