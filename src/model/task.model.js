const mongoose = require('mongoose');

// create task model
const Task = mongoose.model('Task', {
    discription: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        // required: false,
        default: false
    },  // store the id of user who create it
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports =Task