const User = require('../schemas/userSchema')
const mongoose = require('mongoose')

const getUser = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

const postUser = async(req, res) => {
    const {type, name, email, passwrd} = req.body

    let emptyFields = []

    if(!type){
        emptyFields.push('type')
    }
    if(!name){
        emptyFields.push('name')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!passwrd){
        emptyFields.push('passwrd')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const user = await User.create({type, name, email, passwrd})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const patchUser = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }
    res.status(200).json(user)
}

const deleteUser = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findOneAndDelete({_id: id})
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }
    res.status(200).json(user)
}

module.exports = {
    getUser,
    getUsers,
    postUser,
    deleteUser,
    patchUser
}
