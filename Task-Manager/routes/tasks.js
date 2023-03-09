const express = require('express')
const router = express.Router()
const {
    getAllTasks,
    createTask,
    singleTask,
    updateTask,
    deleteTask
} = require('../controllers/TasksController')

router.route('/').get(getAllTasks)
router.route('/').post(createTask)
router.route('/:id').get(singleTask)
router.route('/:id').patch(updateTask)
router.route('/:id').delete(deleteTask)

module.exports = router