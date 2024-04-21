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
router.get('/:id', getGrantApplication)

router.get('/', getGrantApplications)

// here id is id of grant applying to
router.post('/:id', postGrantApplication)

router.patch('/approve/:id', approveGrantApplication)
router.patch('/reject/:id', rejectGrantApplication)

module.exports = router