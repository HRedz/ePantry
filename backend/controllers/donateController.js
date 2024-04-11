const Donate = require('../schemas/donateSchema')
const User = require('../schemas/userSchema')
const mongoose = require('mongoose')

//Get multiple donations
const getDonations = async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user.type == 'organization'){
        const donations = await Donate.find({'orgId' : req.user._id}).sort({createdAt: -1})
        return res.status(200).json(donations)
    }
    else{
        const donations = await Donate.find({'donationID' : req.user._id}).sort({createdAt: -1})
        return res.status(200).json(donations)
    }
}

//Post a donation
const postDonation = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {donorName, phone, address, donationType, donatedItems, orgId} = req.body

    if(user.type != 'individual' && user.type != 'company'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    let emptyFields = []

    if(!donorName){
        emptyFields.push('donorName')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!donationType){
        emptyFields.push('donationType')
    }
    if(!donatedItems){
        emptyFields.push('donatedItems')
    }
    if(!orgId){
        emptyFields.push('donatedItems')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const donationID = req.user._id.toString()
        const donate = await Donate.create({donationID, donorName, phone, address, donationType, donatedItems, orgId})
        res.status(200).json(donate)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDonations,
    postDonation,
}