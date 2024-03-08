const express = require('express')
const {
    getGrant,
    getGrants,
    postGrant,
    patchGrant, 
    deleteGrant
} = require('../controllers/grantController')

const router = express.Router()

router.get('/:id', getGrant)

router.get('/', getGrants)

router.post('/', postGrant)

router.patch('/:id', patchGrant)

router.delete('/:id', deleteGrant)

module.exports = router
