const { body } = require('express-validator');

const loginValidator = [
  body('userEmail', 'Неверный формат почты').isEmail(),
  body('pass', 'Пароль не может быть меньше 5 символов').isLength({ min: 5 })
]

const registrationValidator = [
  body('userEmail', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль не может быть меньше 5 символов').isLength({ min: 5 }),
  body('userName', 'Имя пользователя не может быть меньше 3 символов').isLength({ min: 3 })
]

module.exports = {
  loginValidator,
  registrationValidator
}