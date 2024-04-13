const express = require('express')
const {
    getDonations,
    postDonation,
    getDonation,
    patchDonation
} = require('../controllers/donateController')
const authorizeUser = require('../authorizeUser')
const donationValidate = require('../donationValidate')

const router = express.Router()

router.use(authorizeUser)
router.use(donationValidate)


router.get('/', getDonations)

router.post('/', postDonation)

router.get('/:id', getDonation)
router.patch('/:id', patchDonation)

module.exports = router