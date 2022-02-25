const express = require('express')

// connect to DB
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json()) // without => console.log(req.body) => undefined

// Create User
app.post('/users', (req, res) => {
    const user = new User(req.body)
    // req.body => { name: 'Alaa Tawfik', email: 'alaa@gmail.com', age: 25 }
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
    // console.log(req.body)
    // res.send('testing')
})

// Get users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users) // array of users
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Get user
app.get('/users/:id', (req, res) => {
    // console.log(req.params)  //{ id: '3' }
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        // check if user exist or not
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Create task creation endpoints
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
       res.status(400).send(e)
    })

})

// Get all tasks 
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Get task
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        // check if task exist
        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})



app.listen(port, () => {
    console.log(`Server is listen ${port}`)
})