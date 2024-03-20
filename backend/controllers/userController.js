const User = require('../schemas/userSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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

// use sign up method to create new users for validation
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

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
  
const logInUser = async (req, res) => {
    const {email, passwrd} = req.body

    try {
        const user = await User.logIn(email, passwrd)

        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
  
const signUpUser = async (req, res) => {
    const {type, name, email, passwrd} = req.body

    try {
        const user = await User.signUp(type, name, email, passwrd)

        const token = createToken(user._id)

        res.status(200).json({type, name, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
  

module.exports = {
    getUser,
    getUsers,
    postUser,
    patchUser,
    deleteUser,
    logInUser,
    signUpUser
}
