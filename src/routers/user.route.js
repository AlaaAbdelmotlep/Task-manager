const express = require('express')
// create router from express
const router = new express.Router()
// userModel
const User = require('../model/user.model')
// auth MW
const auth = require('./../middelware/auth')

/*******************************User Route*************************/
// Create User => sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

// User login => login
router.post('/users/login', async (req, res) => {
    try {
        // define findByCredentials
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // generateAuthToken() will be avaliable on instance not Model
        // we need to provide token for spacifc user
        const token = await user.generateAuthToken()
        res.send({user , token})
    } catch(e) {
        res.status(400).send(e)
    }
})

// user logout
router.post('/users/logout', auth, async (req, res) => {
    // once we authenticated we have access to user data
    try {
        
        
    } catch (e) {
        
    }
})

// with MW : new req -> do something( if next() ) -> run route handler
// Get users
router.get('/users/me', auth ,(req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users) // array of users
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
    // As above loggedin user will have access to show all users profile SO
    // we need user to show up his own profile 
    res.send(req.user)
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
    // findByIdAndUpdate() perform direct operation on DB SO we use runValidators
    // User.findByIdAndUpdate(_id, req.body, {
    //     new: true,
    //     runValidators:true
    // }).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.status(302).send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })

    User.findById(_id).then((user) => {
        // apply user update
        updates.forEach((update) => {
            //update => email | password ..
            // user.name = WHAT !! we can't set it static
            user[update] = req.body[update]
        })
        return user.save()
    }).then((data) => {
        res.status(201).send(data)
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

 
 