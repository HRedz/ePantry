const mongoose = require('mongoose')

const Schema = mongoose.Schema
const donationCategory = ['Monetary', 'Non-monetary'];

const donateSchema = new Schema({
    
    donationID: {
        type: String,
        required: true
    },
    
    donorName: {
        type: String,
        required: true,
    },

    orgName: {
        type: String
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

    orgId:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        default: "Pending"
    },

    //Monetary donation fields

    creditCardNum:{
        type: String,
        minlength: [16, 'Credit card number must be 16 digits. Please try again'],
        required: function () { return this.donationType === 'Monetary'; },      
    },

    creditCardExp:{
        //Date will include day, and will have to include HrMinSec when checking
        //in Postman.
        type: Date,
        required: function () { return this.donationType === 'Monetary'; },      
    },

    creditCardCVV:{
        type: String,
        minlength: [3, 'Credit card cvv must be a minimum of 3 digits. Please try again'],
        maxlength: [4, 'Credit card cvv must be at most 4 digits. Please try again'],
        required: function () { return this.donationType === 'Monetary'; },      
    },

    zipcode:{
        type: String,
        minlength: [5, 'US Zipcode must be 5 digits. Please try again'],
        required: function () { return this.donationType === 'Monetary'; },      
    },

    amount:{
        type: Number,
        required: function () { return this.donationType === 'Monetary'; },      
    },

    paymentDate:{
        type: Date,
        required: function () { return this.donationType === 'Monetary'; },      
    },

    //Food donation fields

    //Listing items being donated or the amount to donate. Might change field type later
    donatedItems:{
        type: String,
        required: function () { return this.donationType === 'Non-monetary'; },
    },

    itemWeight:{
        type: Number,
        min: [0, 'Weight must be 0 and above. Try again'],
        required: function () { return this.donationType === 'Non-monetary'; },
    },
    noOfPackages:{
        type: Number,
        min: [0,'The number of packages must be positive'],
        required: function () { return this.donationType === 'Non-monetary'; },
    },
    originZipcode:{
        type: String,
        minlength: [5, 'Origin zipcode must be 5 digits. Please try again'],
        required: function () { return this.donationType === 'Non-monetary'; },      
    },
    destZipcode:{
        type: String,
        minlength: [5, 'Destination zipcode must be 5 digits. Please try again'],
        required: function () { return this.donationType === 'Non-monetary'; },      
    },
    dropoffDate:{
        type: Date,
        required: function () { return this.donationType === 'Non-monetary'; },
    }
},
{
    timestamps: true,
}
);


module.exports = mongoose.model('Donate', donateSchema);