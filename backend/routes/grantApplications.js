const express = require('express')
const {
    getGrantApplication,
    getGrantApplications,
    postGrantApplication,
    approveGrantApplication
} = require('../controllers/grantApplicationController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)

// id is id of application being viewed
router.get('/view/:id', getGrantApplication)

router.get('/view', getGrantApplications)

// here id is id of grant applying to
router.post('/apply/:id', postGrantApplication)

router.patch('/view/:id', approveGrantApplication)

module.exports = router