const Router = require('express')
const router = new Router
const controller = require('../controllers/userController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', roleMiddleware(['admin', 'manager']), controller.getUsers)
router.get('/:userId', roleMiddleware(['admin']), controller.getUser)
router.patch('/:userId', roleMiddleware(['admin']), controller.updateUser)
router.delete('/:userId', roleMiddleware(['admin']), controller.deleteUser)

module.exports = router