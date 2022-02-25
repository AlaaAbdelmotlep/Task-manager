const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

// we spearte schema from model to take advantage of using mongoose MW 
const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:6,
        validate(value) {
            // if (value.length < 6) {
            //   throw new Error('Password must be greater than 6 ')
            // }
            if (value.includes("password")) {
                throw new Error('Password is invalid')
            }
      }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error ('Age must be gratter than zero')
            }
        }
    }
}
)

// set action before data saved
// userSchema.pre(event, funtion NOT arrow)
// we need to access this (created user)
userSchema.pre('save', async function (next) {
    const user = this

    // password is changed or not! (update case)
    // if password is hashed we not need to hashed it again
    if (user.isModified('password')) {
        // console.log('isModified run')
        user.password = await bcrypt.hash(user.password, 8)
    }
    // console.log('isModified not run')
    // to make sure that data is saved(jump to next step)
    // without next user will created but will never saved to DB
    next()
})

// create model
const User = mongoose.model('User', userSchema)
 
module.exports = User
