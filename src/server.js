const express = require('express')

// connect to DB
require('./db/mongoose')

// require routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

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

// const bcrypt = require('bcrypt') 
// Hashing password
// const myFun = async () => {
//     const password = "Rad123^$";
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)
    
//     const isMatch = await bcrypt.compare("password", hashedPassword)
//     console.log(isMatch)
// }
// myFun()
