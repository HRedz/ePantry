const express = require('express')
const {
    getUser,
    getUsers,
    postUser,
    patchUser, 
    deleteUser
} = require('../controllers/userController')

const router = express.Router()

router.get('/:id', getUser)

router.get('/', getUsers)

router.post('/', postUser)

router.patch('/:id', patchUser)

router.delete('/:id', deleteUser)

module.exports = router
