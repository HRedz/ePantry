const express = require('express')
const {
    getGrant,
    getGrants,
    postGrant,
    patchGrant, 
    deleteGrant
} = require('../controllers/grantController')
const authorizeUser = require('../authorizeUser')

const router = express.Router()

router.use(authorizeUser)

router.get('/:id', getGrant)

router.get('/', getGrants)

router.post('/', postGrant)

router.patch('/:id', patchGrant)

router.delete('/:id', deleteGrant)

module.exports = router
