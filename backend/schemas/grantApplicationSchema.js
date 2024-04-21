const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    organizationId: {
        type: String,
        required: true
    },
    grantId: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    applicationText: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    companyName: {
        type: String,
        required: true
    },
    grantTitle: {
        type: String,
        required: true
    },
    grantAmount: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)

