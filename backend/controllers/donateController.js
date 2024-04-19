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
    const {donorName, phone, address, donationType, orgId, creditCardNum, creditCardExp, creditCardCVV, zipcode, amount, paymentDate, donatedItems, itemWeight, noOfPackages, originZipcode, destZipcode, dropoffDate} = req.body

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
    
    if(!orgId){
        emptyFields.push('orgId')
    }

    if(donationType==='Monetary' && (!creditCardNum)){
        emptyFields.push('creditCardNum')
    }
    if(donationType==='Monetary' && (!creditCardExp)){
        emptyFields.push('creditCardExp')
    }
    if(donationType==='Monetary' && (!creditCardCVV)){
        emptyFields.push('creditCardCVV')
    }
    if(donationType==='Monetary' && (!zipcode)){
        emptyFields.push('zipcode')
    }
    if(donationType==='Monetary' && (!amount)){
        emptyFields.push('amount')
    }

    if(donationType==='Non-monetary' && (!donatedItems)){
        emptyFields.push('donatedItems')
    }
    if(donationType==='Non-monetary' && (!itemWeight)){
        emptyFields.push('itemWeight')
    }
    if(donationType==='Non-monetary' && (!noOfPackages)){
        emptyFields.push('noOfPackages')
    }
    if(donationType==='Non-monetary' && (!originZipcode)){
        emptyFields.push('originZipcode')
    }
    if(donationType==='Non-monetary' && (!destZipcode)){
        emptyFields.push('destZipcode')
    }
    if(donationType==='Non-monetary' && (!dropoffDate)){
        emptyFields.push('dropoffDate')
    }
    



    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'All fields must be filled', emptyFields })
    }

    try {
        const donationID = req.user._id.toString()
        const org = await User.findById(orgId)
        const orgName = org.name
        const donate = await Donate.create({donationID, donorName, orgName, phone, address, donationType, orgId, creditCardNum, creditCardExp, creditCardCVV, zipcode, amount, paymentDate, donatedItems, itemWeight, noOfPackages, originZipcode, destZipcode, dropoffDate})
        
        await donate.save();
        console.log('Saved>');
        
        res.status(200).json(donate)
    } catch (error) {
        if(error.name == 'ValidationError') {
            console.error('Validation error check values entered',error);
            return res.status(400).json({error: error.message});
          }
        else{  
            console.error(error);
            res.status(500).json({error: error.message});
        }
    }
}

const getDonation = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        //console.log("id invalid")
        return res.status(404).json({error: 'Donation not found'})
    }

    const donation = await Donate.findById(id)
    if(!donation){
        //console.log("not found")
        return res.status(404).json({error: 'Donation not found'})
    }
    return res.status(200).json(donation)

}

const patchDonation = async(req, res) => {
    const user = await User.findById(req.user._id)
    const {id} = req.params

    if(user.type != 'organization'){
        return res.status(401).json({error: 'Request is not authorized'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Donation not found'})
    }

    const donation = await Donate.findById(id)

    if(!donation){
        return res.status(404).json({error: 'Donation not found'})
    }

    const patchedDonation = await Donate.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(patchedDonation)
}

module.exports = {
    getDonations,
    postDonation,
    getDonation,
    patchDonation
}