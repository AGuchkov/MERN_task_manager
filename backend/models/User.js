const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    ref: 'Role'
  }]
}, {
  timestamps: true
})

module.exports = model('User', userSchema)