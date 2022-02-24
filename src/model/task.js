const mongoose = require('mongoose');
// const validator = require('validator');

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
    }
})

module.exports =Task