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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports =Task