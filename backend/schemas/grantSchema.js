const mongoose = require('mongoose')

const Schema = mongoose.Schema

const grantSchema = new Schema({
    companyId: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    closeDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    open : Boolean,
    applications: [
        {
            applicationId: String
        }
    ],
    winner : String
}, { timestamps: true })

module.exports = mongoose.model('Grant', grantSchema)

