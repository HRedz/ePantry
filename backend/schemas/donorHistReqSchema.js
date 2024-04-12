const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donorHistReqSchema = new Schema({
    userSendingReq: {
        name: { type: String, required: true },
        _id: { type: String, required: true }
    },
    userRecvReq: {
        name: { type: String, required: true },
        _id: { type: String, required: true }
    },
    approved: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('DonorHistReq', donorHistReqSchema)

