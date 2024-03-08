const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwrd: {
        type: String,
        required: true
    },    
    donorHist: [
        {
            donationID: Number
        }
    ],
	appliedGrants: [
        {
            grantID: Number
        }
    ],
	postedgrants: [
        {
            grantID: Number
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

