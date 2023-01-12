const jwt = require('jsonwebtoken')
const Role = require('../models/Role')

module.exports = function (roles) {
  return async function (req, res, next) {
    const rolesId = []
    for (const role of roles) {
      const { _id } = await Role.findOne({ value: role })
      rolesId.push(_id.toString())
    }
    try {
      const token = req.headers.authorization.replace(/Bearer\s?/, '')

      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }

      const { roles: userRoles } = jwt.verify(token, process.env.SECRET)
      let hasRole = false
      userRoles.forEach(role => {
        if (rolesId.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: 'У вас нет доступа' })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
  }
}