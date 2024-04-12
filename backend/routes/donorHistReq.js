const express = require('express')
const {
    reqToViewDonorHist,
	updateApprovalStatus,
	getAllInboundHistReq
} = require('../controllers/donorHistReqController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)

router.post('/:id', reqToViewDonorHist)
router.patch('/', updateApprovalStatus)
router.get('/inbound', getAllInboundHistReq)
router.get('/outbound', getAllOutboundHistReq)

module.exports = router