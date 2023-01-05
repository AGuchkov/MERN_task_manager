const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  value: {
    type: String,
    unique: true,
    default: 'user'
  },
  default: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = model('Role', roleSchema)