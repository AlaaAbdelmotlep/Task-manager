const jwt = require('jsonwebtoken')
const User = require('./../model/user.model')

// authentication middelware
const auth = async (req, res, next) => {
    try {
        // Get token from request header
        // req.header('headerName')
        // const token = req.header('Authorization')
        // console.log(token)
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE5Zjk1Y2VjZGRkZWYwNzYyZmY1M2UiLCJpYXQiOjE2NDU4NzQyMDJ9.vFRt3JEYXLUqTbzYgaZFqJfQ596MRGPguTZEBFDCELM
        const token = req.header('Authorization').replace('Bearer ', '')
        // if there No Authorization header, undefined.replace which need to catch error
        // we already have catch block
        const decoded = jwt.verify(token, 'taskmangerapi')
        // we already embedded user id in token
        // we use embedded user _id to grap user from DB
        // try to find user by ID
        // we need also to check if user still logged in 
        // that mean user still has token object in tokens[]
        const user = await User.findOne({_id : decoded._id , 'tokens.token': token})
        // NOW we find user By ID, and make sure user still logged in
        if (!user) {
            throw new Error()
        }
        // if user exist:-
        // give route access to get user
        // send to to use it in logout
        req.token = token
        req.user = user
        // console.log("Auth") 
        next()
    } catch (e) {
        res.status(401).send({error : 'Please authenticate'})
    }
}

module.exports = auth
