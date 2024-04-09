const User = require('../schemas/userSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// individuals and companies should only be able to see orgs
// orgs can see companies (done) and individuals that donate to them (need to do)
// users of all types can see themselves
const getUser = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }
    
    //console.log(req.user._id + ' ' + id)
    //console.log(user.type)
    if(req.user._id.toString() == id){
        return res.status(200).json(user)
    }

    if(user.type == 'company' || user.type == 'individual'){
        const org = await User.findById(id)
        if(org.type != 'organization'){
            return res.status(401).json({error: 'Request is not authorized'})
        }
        if(!org){
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json(org)
    }
    else if(user.type == 'organization'){
        const company = await User.findById(id)
        if(company.type != 'company'){
            return res.status(401).json({error: 'Request is not authorized'})
        }
        if(!company){
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json(company)
    }
    else{
        res.status(401).json({error: 'Request is not authorized'})
    }
    
    /*const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)*/
}

const getUsers = async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type == 'company' || user.type == 'individual'){
        const orgs = await User.find({'type' : 'organization'}).sort({createdAt: -1})
        res.status(200).json(orgs)
    }
    else if(user.type == 'organization'){
        const companies = await User.find({'type' : 'company'}).sort({createdAt: -1})
        res.status(200).json(companies)
    }
    else{
        res.status(401).json({error: 'Request is not authorized'})
    }
    //const users = await User.find({}).sort({createdAt: -1})
    //res.status(200).json(users)
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

// users of any type should only be able to update themselves
const patchUser = async(req, res) => {
    //const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    if(req.user._id.toString() != id){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    /*const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })*/

    const patchedUser = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!patchUser){
        return res.status(404).json({error: 'User not found'})
    }
    
    
    res.status(200).json(patchedUser)
}

// users of any type should only be able to delete themselves
const deleteUser = async(req, res) => {
    //const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }
    if(req.user._id.toString() != id){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const deletedUser = await User.findOneAndDelete({_id: id})
    if(!deletedUser){
        return res.status(404).json({error: 'User not found'})
    }
    res.status(200).json(deletedUser)
}

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
  
const logInUser = async (req, res) => {
    const {email, passwrd} = req.body

    try {
        const user = await User.logIn(email, passwrd)

        const token = createToken(user._id)

        const id = user._id.toString()

        res.status(200).json({id, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
  
const signUpUser = async (req, res) => {
    const {type, name, email, passwrd} = req.body

    try {
        const user = await User.signUp(type, name, email, passwrd)

        const token = createToken(user._id)

        const id = user._id.toString()

        res.status(200).json({id, type, name, email, token})
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
