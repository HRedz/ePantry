const Grant = require('../schemas/grantSchema')
const User = require('../schemas/userSchema')
const Application = require('../schemas/grantApplicationSchema')
const mongoose = require('mongoose')

// orgs can view all grants, companies can view own grants
const getGrantApplication = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Application not found'})
    }

    if(user.type != 'company' && user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const app = await Application.findById(id)

    if(user.type == 'organization' && req.user._id.toString() != app.organizationId.toString()){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(user.type == 'company' && req.user._id.toString() != app.companyId.toString()){
        return res.status(401).json({error: 'Request is not authorized'})
    }
    
    if(!app){
        return res.status(404).json({error: 'App not found'})
    }

    res.status(200).json(app)
}

const getGrantApplications = async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user.type != 'company' && user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(user.type == 'company'){
        const apps = await Application.find({'companyId' : req.user._id}).sort({createdAt: -1})
        res.status(200).json(apps)
    }
    else{
        const apps = await Application.find({'organizationId' : req.user._id}).sort({createdAt: -1})
        res.status(200).json(apps)
    }
}

// only orgs can apply to grants
const postGrantApplication = async(req, res) => {
    const user = await User.findById(req.user._id)
    // grant id from url
    const {id} = req.params

    if(user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    const {applicationText} = req.body

    let emptyFields = []

    if(!applicationText){
        emptyFields.push('applicationText')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const organizationId = req.user._id.toString()
        const grant = await Grant.findById(id)
        const grantId = grant._id
        const companyId = grant.companyId
        const status = 'Applied'
        const app = await Application.create({organizationId, grantId, companyId, applicationText, status})
        res.status(200).json(app)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// patch for approving grants
const approveGrantApplication = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(user.type != 'company'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Application not found'})
    }

    const app = await Application.findById(id)

    if(!app){
        return res.status(404).json({error: 'Application not found'})
    }

    const patchedApp = await Application.findOneAndUpdate({_id: id}, {
        status : 'Approved'
    })

    res.status(200).json(patchedApp)
}

/*const rejectGrantApplication = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(user.type != 'company'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Application not found'})
    }

    const app = await Application.findById(id)

    if(!app){
        return res.status(404).json({error: 'Application not found'})
    }

    const patchedApp = await Application.findOneAndUpdate({_id: id}, {
        status : 'Rejected'
    })

    res.status(200).json(patchedApp)
}*/



module.exports = {
    getGrantApplication,
    getGrantApplications,
    postGrantApplication,
    approveGrantApplication
}
