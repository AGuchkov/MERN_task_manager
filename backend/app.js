require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { authRouter, stageRouter, taskRouter, roleRouter, userRouter } = require('./routes')
const initializeStorage = require('./db/storage')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/roles', roleRouter)
app.use('/api/v1/stages', stageRouter)
app.use('/api/v1/tasks', taskRouter)

const start = async () => {
  try {
    await initializeStorage()
    app.listen(port, () => console.log(`Server start on port ${port}...`))
  } catch (e) {
    console.log(e)
  }
}

start()