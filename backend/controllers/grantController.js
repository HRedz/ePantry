const Grant = require('../schemas/grantSchema')
const mongoose = require('mongoose')

const getGrant = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    const grant = await Grant.findById(id)
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }

    res.status(200).json(grant)
}

const getGrants = async(req, res) => {
    const grants = await Grant.find({}).sort({createdAt: -1})
    res.status(200).json(grants)
}

const postGrant = async(req, res) => {
    const {company, title, amount, closeDate, description} = req.body

    let emptyFields = []

    if(!company){
        emptyFields.push('company')
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
        const grant = await Grant.create({company, title, amount, closeDate, description})
        res.status(200).json(grant)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const patchGrant = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    const grant = await Grant.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }
    res.status(200).json(grant)
}

const deleteGrant = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Grant not found'})
    }

    const grant = await Grant.findOneAndDelete({_id: id})
    if(!grant){
        return res.status(404).json({error: 'Grant not found'})
    }
    res.status(200).json(grant)
}

module.exports = {
    getGrant,
    getGrants,
    postGrant,
    patchGrant,
    deleteGrant,
}
