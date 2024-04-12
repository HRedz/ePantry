const express = require('express')
const {
    postDonorHistReq,
	updateApprovalStatus,
	getAllInboundHistReq,
	getAllOutboundHistReq
} = require('../controllers/donorHistReqController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)

// post request to view donation history of user id
router.post('/:id', postDonorHistReq)

// update approval status. (could also use this to revoke access)
// body should contain:
// _id (ObjectID of the donor history request)
// approvalStatus (true/false)
router.patch('/', updateApprovalStatus)

// Get all Inbound/outbound req to view history
router.get('/inbound', getAllInboundHistReq)
router.get('/outbound', getAllOutboundHistReq)

module.exports = router