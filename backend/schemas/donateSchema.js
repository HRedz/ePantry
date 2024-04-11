const mongoose = require('mongoose')

const Schema = mongoose.Schema
const donationCategory = ['Monetary', 'Non-monetary'];

const donateSchema = new Schema({
    
    donationID: {
        type: String,
        required: true
        //type: Number,
        //default: Math.floor(1000000000 + Math.random() * 9000000000),
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
        enum: donationCategory,
        required: true,
    },

    //Listing items being donated or the amount to donate.
    //Might change field type later
    donatedItems:{
        type: String,
        required: true,
    },

    orgId:{
        type: String,
        required: true,
    },

    creditCardNum:{
        type: Number,
        minlength: [16, 'Credit card number must be 16 digits. Please try again'],
        required: isMonetary,      
    },

    creditCardExp:{
        //The type can be Date, but that will include day, and will have to include HrMinSec when checking
        //in Postman.
        type: String,
        required: isMonetary,      
    },

    creditCardCVV:{
        type: Number,
        minlength: [3, 'Credit card cvv must be a minimum of 3 digits. Please try again'],
        maxlength: [4, 'Credit card cvv must be at most 4 digits. Please try again'],
        required: isMonetary,      
    },

    zipcode:{
        type: Number,
        minlength: [5, 'US Zipcode must be 5 digits. Please try again'],
        required: isMonetary,      
    }
},
{
    timestamps: true,
}
);

function isMonetary(){
    //checking if the enum selected is monetary
    if(donationCategory.includes('Monetary')) {
        return true;
    }
    return false;
}

function isNonmonetary(){
    //checking if the enum selected is monetary
    if(donationCategory.includes('Non-monetary')) {
        return true;
    }
    return false;
}

module.exports = mongoose.model('Donate', donateSchema);