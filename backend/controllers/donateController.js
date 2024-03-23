const Donate = require('../schemas/donateSchema')
const mongoose = require('mongoose')

//Get multiple donations
const getDonations = async(req, res) => {
    const donations = await Donate.find({}).sort({createdAt: -1})
    res.status(200).json(donations)
}

//Post a donation
const postDonation = async(req, res) => {
    const {donationID, donorName, phone, address, donationType, donatedItems} = req.body

    let emptyFields = []

    if(!donationID){
        emptyFields.push('donationID')
    }
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

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const donate = await Donate.create({donationID, donorName, phone, address, donationType, donatedItems})
        res.status(200).json(donate)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDonations,
    postDonation,
}