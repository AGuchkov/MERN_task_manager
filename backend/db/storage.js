const connectDB = require('./connect')
const Stage = require('../models/Stage')
const Role = require('../models/Role')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const initializeStorage = async () => {
  await connectDB(process.env.MONGO_URI)
  const stages = await Stage.find()
  if (!stages.length) {
    Stage.create([
      { name: 'ready', default: true },
      { name: 'progress' },
      { name: 'review' },
      { name: 'done' }
    ]).catch(console.error)
  }
  const roles = await Role.find();
  if (!roles.length) {
    Role.create([
      { value: 'user', default: true },
      { value: 'admin' },
      { value: 'manager' }
    ]).catch(console.error)
  }
  const adminRole = await Role.findOne({ value: 'admin' })
  const admin = await User.findOne({ roles: adminRole._id })
  if (!admin) {
    User.create([
      { userName: process.env.ADMIN_NAME, userEmail: process.env.ADMIN_EMAIL, userPassword: bcrypt.hashSync(process.env.ADMIN_PASS, 7), roles: [adminRole._id] }
    ]).catch(console.error)
  }
}

module.exports = initializeStorage;
