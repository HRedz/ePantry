const User = require('../schemas/userSchema')
const DonorHistReq = require('../schemas/donorHistReqSchema')
const mongoose = require('mongoose')

// only organizations can request to view donor history
// organizations cannot request to view each others history  
const postDonorHistReq = async(req, res) => {
    const {id} = req.params // id of user receiving request for donor hist
	
	if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }
		
	const userRecvReq = await User.findById(id)
	if(!userRecvReq){
        return res.status(404).json({error: 'User not found'})
    }
	
	const userSendReq = await User.findById(req.user._id)
	if(!userSendReq){
        return res.status(404).json({error: 'User not found'})
    }
	
	// check if request already exists, dont allow duplicates
	const existingRequest = await DonorHistReq.findOne({
        'userSendingReq._id': userSendReq.id,
        'userRecvReq._id': userRecvReq.id
    });
	if (existingRequest) {
		return res.status(406).json({error: 'Request already exists'})
	}
	
	// User sending request must be org, and can't send req to another org
	if (userSendReq.type != "organization" || userRecvReq.type == "organization") {
		return res.status(401).json({error: 'Request is not authorized'})
	}
	
	// construct new donor hist req
	const newRequest = new DonorHistReq({
        userSendingReq: {
            name: userSendReq.name,
            _id: userSendReq.id
        },
        userRecvReq: {
            name: userRecvReq.name,
            _id: userRecvReq.id
        },
        approved: false
    });
	
	// create new request
	try {
        const viewDonorHist = await DonorHistReq.create(newRequest)
        res.status(200).json(viewDonorHist)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
	
	res.status(200).json()
}

const updateApprovalStatus = async(req, res) => {
	const { _id, approvalStatus } = req.body // _id is ObjectID of the donor history request itself, 
											 // and status of request (true/false)
	
	if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'User not found'})
    }
	
	const HistReq = await DonorHistReq.findById(_id);
	if (!HistReq) {
		return res.status(404).json({error: 'Request for Donor History not found'})
	}
	
	// users should only be able to approve requests they recieved
	if (HistReq.userRecvReq._id != req.user._id) {
		return res.status(401).json({error: 'Request is not authorized'})
	}
	
	// Approve history request
	if (approvalStatus) {
		try {
			const updatedDoc = await DonorHistReq.findByIdAndUpdate(
				HistReq.id, // Ensure that the id is converted to an ObjectId
				{ $set: { approved: approvalStatus } },
				{ new: true } // Returns the modified document rather than the original by default
			);
			
			res.status(200).json(updatedDoc);
		} catch (error) {
			res.status(400).json({error: error.message})
		}
	}
	else {//deny request
		try {
			const result = await DonorHistReq.findByIdAndDelete(_id);
			res.status(200).json(result); // This will be the document that was deleted, or null if no document was found
		} 
		catch (error) {
			res.status(400).json({error: error.message})
		}
	}
}

const getAllInboundHistReq = async(req, res) => {
	try {
        const docs = await DonorHistReq.find({ "userRecvReq._id": req.user._id });
        res.status(200).json(docs);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllOutboundHistReq = async(req, res) => {
	try {
        const docs = await DonorHistReq.find({ "userSendingReq._id": req.user._id });
        res.status(200).json(docs);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
	postDonorHistReq,
	updateApprovalStatus,
	getAllInboundHistReq,
	getAllOutboundHistReq
}
