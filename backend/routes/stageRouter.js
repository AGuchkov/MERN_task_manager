const Router = require('express')
const router = new Router
const controller = require('../controllers/stageController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, controller.getStages)

module.exports = router