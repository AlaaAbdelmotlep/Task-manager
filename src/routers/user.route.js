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
router.post('/users/logout', auth , async (req, res) => {
    // once we authenticated we have access to user data
    try {
        // get auth token 
        // we need to give user premmision to logout from all sessions
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        // if true => tokens will remain same
        // if false => token will delete
        // need to save changes in DB
        // we don't have user instead we have req.user
        await req.user.save()
        res.send()
        
    } catch (e) {
        res.status(400).send(e)
        
    }
})

// User logoutall
router.post('/users/logoutall', auth, async (req, res) => {
    try{
        // const isAuth = req.user.tokens.includes(req.token)
        // if (isAuth) {
        //     req.user.tokens = []
        // await req.user.save()
        // res.send()
        // }

        req.user.tokens = []
        await req.user.save()
        res.send()
    
    } catch (e) {
        res.status(400).send(e)
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

// Update user
router.patch('/users/me', auth, async (req, res) => {
    // update not valid keys
    const updates = Object.keys(req.body)
    const allwoedUpdates = ['name', 'email', 'password', 'age']
    // isValidOperation is Boolean value
    const isValidOperation = updates.every((update) =>
        allwoedUpdates.includes(update) )
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!")
    }

    // const _id = req.user._id

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

    // User.findById(_id).then((user) => {
        // apply user update
    try {
        updates.forEach((update) => {
            //update => email | password ..
            // user.name = WHAT !! we can't set it static
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
        // NO need to check user, we have auth user
        if (!user) {
            return res.status(404).send()
        }
    
    // Now we already have user after auth
    // we don't have yet user variable, instead we have req.user
        
        // req.user.remove(); mongoose method
        res.status(302).send(req.user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// exports routes
module.exports = router

 
 