const Stage = require('../models/Stage')

class stageController {
  async getStages(req, res) {
    try {
      const stages = await Stage.find({})
      res.json(stages)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new stageController