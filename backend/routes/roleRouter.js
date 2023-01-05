const Router = require('express')
const router = new Router
const controller = require('../controllers/roleController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, controller.getRoles)

module.exports = router