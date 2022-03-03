const express = require('express')

// connect to DB
require('./db/mongoose')

// require routers
const userRouter = require('./routers/user.route')
const taskRouter = require('./routers/task.route');

// create server
const app = express();

// define PORT number
const port = process.env.PORT || 3000

// parsing req.body to object
app.use(express.json())

// register routes
app.use(userRouter)
app.use(taskRouter)

// make server listen to PORT
app.listen(port, () => {
    console.log(`Server is listen ${port}`)
})
