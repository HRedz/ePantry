const Donate = require('./schemas/donateSchema')

const donationValidate = async (req, res, next) => {
    
    //This is to ensure that only the 'Monetary' related fields are being sent to the db. We don't want non-monetary fields 
    //to also be pushed to db. setting these fields as undefined means they are not a specific type and in a way removes the fields
    if(req.body.donationType === 'Monetary'){
        req.body.donatedItems = undefined;
        req.body.itemWeight = undefined; 
        req.body.noOfPackages = undefined;
        req.body.originZipcode = undefined;
        req.body.destZipcode = undefined;
        req.body.dropoffDate = undefined;
    }

    //This is to ensure that only the 'Non-monetary' related fields are being sent to the db.
    else if(req.body.donationType === 'Non-monetary'){
        req.body.creditCardNum = undefined;
        req.body.creditCardExp = undefined;
        req.body.creditCardCVV = undefined;
        req.body.zipcode = undefined;
    }

    next();
}


module.exports = donationValidate;