const express = require('express')
// create router from express
const router = new express.Router()
// setup routes
// router.get('/test', (req, res) => {
//     res.send("Hi from user route")
// })
const User = require('./../model/user')

/*******************************User Route*************************/
// Create User
router.post('/users', (req, res) => {
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
router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users) // array of users
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Get user
router.get('/users/:id', (req, res) => {
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

// Update user
router.patch('/users/:id', (req, res) => {
    // update not valid keys
    const updates = Object.keys(req.body)
    const allwoedUpdates = ['name', 'email', 'password', 'age']
    // isValidOperation is Boolean value
    const isValidOperation = updates.every((update) =>
        allwoedUpdates.includes(update) )
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!")
    }
    const _id = req.params.id
    // find user by id that return user or nothing
    // Model.findByIdAndUpdate(id,filed updated,option)
    User.findByIdAndUpdate(_id, req.body, {
        new: true,
        runValidators:true
    }).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.status(302).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Delete User
router.delete('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(302).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// exports routes
module.exports = router

 
 