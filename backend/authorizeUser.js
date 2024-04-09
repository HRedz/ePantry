const jwt = require('jsonwebtoken')
const User = require('./schemas/userSchema')

const authorizeUser = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  // token is second word in string --> "Bearer <token>"
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = authorizeUser