const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donateSchema = new Schema({
    
    donationID: {
        type: Number,
        default: Math.floor(1000000000 + Math.random() * 9000000000),
    },
    
    donorName: {
        type: String,
        required: true,
    },

    phone:{
        type: Number,
        required: true,
    },

    address:{
        type: String,
        required: true,
    },

    donationType:{
        type:String,
        enum:['Monetary donation', 'Non-monetary donation'],
        required: true,
    },

    //Listing items being donated or the amount to donate.
    //Might change field type later
    donatedItems:{
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);


module.exports = mongoose.model('Donate', donateSchema);