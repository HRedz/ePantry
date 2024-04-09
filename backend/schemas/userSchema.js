const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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
        required: true,
        unique: true
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

// static methods for logging in and signing up

userSchema.statics.logIn = async function(email, passwrd) {
    if (!email || !passwrd) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })

    if (!user) {
      throw Error('No account found with email')
    }
  
    const match = await bcrypt.compare(passwrd, user.passwrd)

    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
}

userSchema.statics.signUp = async function(type, name, email, passwrd) {
    if (!type || !name|| !email || !passwrd) {
      throw Error('All fields must be filled')
    }
    // validate type and name?
    if (!validator.isEmail(email)) {
      throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(passwrd)) {
      throw Error('Password is not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email is already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(passwrd, salt)
  
    const user = await this.create({ type, name, email, passwrd: hash })
  
    return user
}
  

module.exports = mongoose.model('User', userSchema)

