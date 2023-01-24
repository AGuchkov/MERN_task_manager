const Router = require('express')
const router = new Router
const controller = require('../controllers/authController')
const { loginValidator, registrationValidator } = require('../middleware/validations')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', registrationValidator, controller.registration)
router.post('/login', loginValidator, controller.login)
router.get('/', authMiddleware, controller.isAuth)

module.exports = router