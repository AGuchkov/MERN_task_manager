const jwt = require('jsonwebtoken')

module.exports = function (roles) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.replace(/Bearer\s?/, '')

      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }

      const { roles: userRoles } = jwt.verify(token, process.env.SECRET)
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
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