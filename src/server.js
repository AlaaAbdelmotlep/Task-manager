const express = require('express')
// connect to DB
require('./db/mongoose')
// require schema
// const User = require('./model/user')
// const Task = require('./model/task')
// require routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
// create server
const app = express();
// define PORT number
const port = process.env.PORT || 3000
// parsing req.body to object
app.use(express.json()) // without => console.log(req.body) => undefined
// Create router using express
// const router = new express.Router()
// set up route
// router.get('/test', (req, res) => {
//     res.send("this is my router")
// })
// register router in express app
// app.use(router)

// register user router
app.use(userRouter)
app.use(taskRouter)



// make server listen to PORT
app.listen(port, () => {
    console.log(`Server is listen ${port}`)
})