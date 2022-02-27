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
    }
})

module.exports =Task