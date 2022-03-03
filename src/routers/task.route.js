const express = require('express');
const router = new express.Router()

const auth = require('./../middelware/auth')
const Task = require('../model/task.model')

/*******************************Task Route*************************/

// Create task creation endpoints
router.post('/tasks', auth, (req, res) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id 
    })

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
       res.status(400).send(e)
    })

})

// Get all tasks 
router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks')
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// Get task
router.get('/tasks/:id', auth, (req, res) => {
    const _id = req.params.id

    Task.findOne({ _id, owner : req.user._id }).then((task) => {
        if (!task) {
            res.send('No task found')
        }
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Update Task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allwoedUpdates = ['discription', 'completed']
    const isValidOperation = updates.every((update) => 
        allwoedUpdates.includes(update) )
    if (!isValidOperation) {
        return res.status(400).send('error: Invalid updates!')
    }

    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.send("No task found")
        }

        updates.forEach((update) => task[update] = req.body[update])
            await task.save()
            res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete Task
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
    if (!task) {
        return res.send("No task found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router