const express = require('express');
const router = new express.Router()

const auth = require('./../middelware/auth')
const Task = require('../model/task.model')

/*******************************Task Route*************************/

// Create task creation endpoints
router.post('/tasks', auth, (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
       res.status(400).send(e)
    })

})

// Get all tasks 
router.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Get task
router.get('/tasks/:id', (req, res) => {
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

// Update Task
router.patch('/tasks/:id', (req, res) => {
    // update not valid keys
    const updates = Object.keys(req.body)
    const allwoedUpdates = ['discription', 'completed']
    // isValidOperation is Boolean value
    const isValidOperation = updates.every((update) => 
        allwoedUpdates.includes(update) )
    if (!isValidOperation) {
        return res.status(400).send('error: Invalid updates!')
    }
    const _id = req.params.id
    // Task.findByIdAndUpdate(_id, req.body, {
    //     new: true,
    //     runValidators:true
    // }).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.status(302).send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
    Task.findById(_id).then((task) => {
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        return task.save()
    }).then((data) => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Delete Task
router.delete('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findByIdAndDelete(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.status(302).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

module.exports = router