const mongoose = require('mongoose');
const validator = require('validator');

// create model
const User = mongoose.model('User', {
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
})

module.exports = User