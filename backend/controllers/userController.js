const User = require('../models/User')

class userController {
  async getUsers(req, res) {
    try {
      const users = await User.find({})
      const temp = JSON.parse(JSON.stringify(users))
      temp.forEach(user => {
        delete user.userPassword
        delete user.updatedAt
        delete user.__v
      })
      res.json(temp)
    } catch (e) {
      console.log(e)
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      const { userPassword, createdAt, updatedAt, __v, ...userData } = user._doc
      res.json({ ...userData })
    } catch (e) {
      console.log(e)
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, { ...req.body }, {
        new: true,
        runValidators: true,
      })

      if (!user) {
        return res.status(404).json({ message: `Пользователя с id: ${req.params.userId} не найдено` })
      }

      res.status(200).json({ message: 'Пользователь обновлен успешно', user })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при обновлении пользователя' })
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId })
      if (!user) {
        return res.status(404).json({ message: `Пользователя с id: ${req.params.userId} не найдено` })
      }
      res.status(200).json({ message: 'Пользователь удален успешно', user });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при удалении пользователя' })
    }
  }
}

module.exports = new userController