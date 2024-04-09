const express = require('express')
const {
    getDonations,
    postDonation,
} = require('../controllers/donateController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)


router.get('/', getDonations)

router.post('/', postDonation)

module.exports = router