const express = require('express')
const router = new express.Router()
const User = require('../model/user.model')
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
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    } catch(e) {
        res.status(400).send(e)
    }
})

// user logout
router.post('/users/logout', auth , async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
        
    } catch (e) {
        res.status(400).send(e)
        
    }
})

// User logoutall
router.post('/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/me', auth ,(req, res) => {
    res.send(req.user)
})

// Update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allwoedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>
        allwoedUpdates.includes(update) )
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!")
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete User
router.delete('/users/me', auth, (req, res) => {

    const _id = req.user._id
    User.findByIdAndDelete(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(302).send(req.user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

module.exports = router

 
 