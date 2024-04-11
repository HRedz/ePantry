const Grant = require('../schemas/grantSchema')
const User = require('../schemas/userSchema')
const Application = require('../schemas/grantApplicationSchema')
const mongoose = require('mongoose')

// orgs can view all grants, companies can view own grants
const getGrant = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    if(user.type != 'company' && user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const grant = await Grant.findById(id)

    if(user.type == 'company' && req.user._id.toString() != grant.companyId.toString()){
        return res.status(401).json({error: 'Request is not authorized'})
    }
    
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }

    if(user.type == 'organization'){
        // Not Applied -> org id not associated with any applications
        // Applied --> org id associated with an applications
        // Approved --> org id is winner
        // not selected --> org is not winner and open is false --> not implemented yet

        const app = await Application.findOne({'organizationId' : req.user._id})

        if(!app){
            return res.status(200).json({grant: grant, status: 'Not Applied'})
        }

        return res.status(200).json({grant: grant, status: app.status})
    }

    res.status(200).json(grant)
}

const getGrants = async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user.type != 'company' && user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(user.type == 'company'){
        const grants = await Grant.find({'companyId' : req.user._id}).sort({createdAt: -1})
        res.status(200).json(grants)
    }
    else{
        const grants = await Grant.find({}).sort({createdAt: -1})
        res.status(200).json(grants)
    }
}

// only companies can post grants
const postGrant = async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user.type != 'company'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const {companyName, title, amount, closeDate, description} = req.body

    let emptyFields = []

    if(!companyName){
        emptyFields.push('companyName')
    }
    if(!title){
        emptyFields.push('title')
    }
    if(!amount){
        emptyFields.push('amount')
    }
    if(!closeDate){
        emptyFields.push('closeDate')
    }
    if(!description){
        emptyFields.push('description')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const companyId = req.user._id.toString()
        const grant = await Grant.create({companyId, companyName, title, amount, closeDate, description})
        res.status(200).json(grant)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// companies can update their own grants and orgs may update all grants (applying)
const patchGrant = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(user.type != 'company' && user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    const grant = await Grant.findById(id)

    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }

    if(user.type == 'company' && grant.companyId != req.user.id.toString()){
        return res.status(401).json({error: 'Request is not authorized'})
    } 

    const patchedGrant = await Grant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(patchedGrant)
}

// companies can delete their own grants
const deleteGrant = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(user.type != 'company'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    const grant = await Grant.findById(id)
    
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }

    if(grant.companyId != req.user.id.toString()){
        return res.status(401).json({error: 'Request is not authorized'})
    } 

    const deletedGrant = await Grant.findOneAndDelete({_id: id})
    res.status(200).json(deletedGrant)
}

const getApplicationStatus = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    if(user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const grant = await Grant.findById(id)
    
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }

    // Not Applied -> org id not associated with any applications
    // Applied --> org id associated with an applications
    // Approved --> org id is winner
    // not selected --> org is not winner and open is false --> not implemented yet

    const app = await Application.findOne({'organizationId' : req.user._id})

    if(!app){
        return res.status(200).json({status: 'Not Applied'})
    }

    res.status(200).json({status: app.status})
}

module.exports = {
    getGrant,
    getGrants,
    postGrant,
    patchGrant,
    deleteGrant,
    getApplicationStatus
}
