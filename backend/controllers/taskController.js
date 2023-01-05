const Task = require('../models/Task')
const Stage = require('../models/Stage')
const User = require('../models/User')

class taskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({})
      if (!tasks.length) {
        return res.status(404).json({ message: `Нет активных задач` })
      }
      res.json(tasks)
    } catch (e) {
      console.log(e)
    }
  }

  async getOneTask(req, res) {
    try {
      const task = await Task.findOne({ _id: req.params.taskId })
      if (!task) {
        return res.status(404).json({ message: `Задачи с id: ${req.params.taskId} не найдено` })
      }
      res.json(task)
    } catch (e) {
      console.log(e)
    }
  }

  async createTask(req, res) {
    try {
      const stage = await Stage.findOne({ default: true });
      const user = await User.findById(req.user.decodedData.id)
      let { expiredDate } = req.body
      if (typeof expiredDate !== 'undefined') {
        expiredDate = new Date(parseInt(expiredDate, 10) + (180 * 60 * 1000))
      }
      const task = await Task.create({ ...req.body, expiredDate, stage: stage._id, user: user._id, carryOut: user._id })
      res.status(201).json({ message: 'Задача создана успешно', task })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при создании задачи' })
    }
  }

  async updateTask(req, res) {
    try {
      const task = await Task.findOneAndUpdate({ _id: req.params.taskId }, { ...req.body }, {
        new: true,
        runValidators: true,
      })

      if (!task) {
        return res.status(404).json({ message: `Задачи с id: ${req.params.taskId} не найдено` })
      }

      res.status(200).json({ message: 'Задача обновлена успешно', task })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при обновлении задачи' })
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.taskId })
      if (!task) {
        return res.status(404).json({ message: `Задачи с id: ${req.params.taskId} не найдено` })
      }
      res.status(200).json({ message: 'Задача удалена успешно', task });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка при удалении задачи' })
    }
  }
}

module.exports = new taskController