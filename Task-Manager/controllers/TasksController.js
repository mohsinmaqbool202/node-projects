const Task = require('../models/TaskModel')

// get all tasks
const getAllTasks = async (_, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// create new task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// get single task
const singleTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })

        // if record not exist
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// update task
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate(
            { _id: taskID }, 
            req.body,
            {
                new: true, //always return the updated record insted of old one
                runValidators: true //will apply the validations
            }
        )

        // if record not exist
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// delete task
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });

        // if record not exist
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}



module.exports = {
    getAllTasks,
    createTask,
    singleTask,
    updateTask,
    deleteTask
}