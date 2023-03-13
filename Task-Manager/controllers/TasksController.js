const Task = require('../models/TaskModel')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

// get all tasks
const getAllTasks = asyncWrapper(async (_, res) => {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
})

// create new task
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// get single task
const singleTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({ task })
})

// update task
const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate(
        { _id: taskID },
        req.body,
        {
            new: true, //always return the updated record insted of old one
            runValidators: true //will apply the validations
        }
    )

    if (!task) {
        return next(new createCustomError(`No task with id ${taskID}`, 404))
    }

    res.status(200).json({ task })
})

// delete task
const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
        return next(new createCustomError(`No task with id ${taskID}`, 404))
    }

    res.status(200).json({ task })
})



module.exports = {
    getAllTasks,
    createTask,
    singleTask,
    updateTask,
    deleteTask
}