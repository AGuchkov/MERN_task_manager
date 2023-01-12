const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const generateAccessToken = require('../utils/token')

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors })
      }
      const { userName, userEmail, password } = req.body
      const candidate = await User.findOne({ userEmail })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь c таким email уже существует' })
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'user' })
      const user = new User({ userName, userEmail, userPassword: hashPassword, roles: [userRole._id] })
      await user.save()
      const token = generateAccessToken(user._id, user.roles)

      const { userPassword, createdAt, updatedAt, __v, ...userData } = user._doc

      res.status(201).json({ message: `${user.userName}, успешно зарегистрирован!`, ...userData, token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при регистрации' })
    }
  }

  async login(req, res) {
    try {
      const { userEmail, password } = req.body
      const user = await User.findOne({ userEmail })
      if (!user) {
        return res.status(400).json({ message: `Пользователь с ${userEmail} не существует!` })
      }
      const validPassword = bcrypt.compareSync(password, user.userPassword)
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен не верный пароль' })
      }
      const token = generateAccessToken(user._id, user.roles)

      const { userPassword, createdAt, updatedAt, __v, ...userData } = user._doc

      return res.json({ message: `Добро пожаловать ${userData.userName}!`, ...userData, token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при входе' })
    }
  }

  async isAuth(req, res) {
    try {
      const token = req.user.token
      const user = await User.findOne({ _id: req.user.decodedData.id })

      const { userPassword, createdAt, updatedAt, __v, ...userData } = user._doc

      res.json({ ...userData, token })
    } catch (e) {
      console.log(e)
      res.status(403).json({ message: 'Не авторизованый пользователь' })
    }
  }
}

module.exports = new authController