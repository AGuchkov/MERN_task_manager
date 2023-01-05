const Router = require('express')
const router = new Router
const controller = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, controller.getAllTasks)
router.get('/:taskId', authMiddleware, controller.getOneTask)
router.post('/', authMiddleware, controller.createTask)
router.patch('/:taskId', authMiddleware, controller.updateTask)
router.delete('/:taskId', roleMiddleware(['admin', 'manager']), controller.deleteTask)

module.exports = router