const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager').then(() => {
    console.log("connected")
}).catch((error) => {
    console.log(error)
})

