const Role = require('../models/Role')

class roleController {
  async getRoles(req, res) {
    try {
      const roles = await Role.find({})
      res.json(roles)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new roleController