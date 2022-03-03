const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task.model');

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
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
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    }, {
    timestamps: true
}
)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// create token and send it back to user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'taskmangerapi')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Hidden private data => tokens , password
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
} 

// Set findByCredentials functionality
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({ email }) 
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete User Tasks when account used
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

// create model
const User = mongoose.model('User', userSchema)
 
module.exports = User
