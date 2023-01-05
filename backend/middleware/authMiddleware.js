const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.replace(/Bearer\s?/, '')

    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }

    const decodedData = jwt.verify(token, process.env.SECRET)
    req.user = {decodedData , token}
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'Пользователь не авторизован' })
  }
}