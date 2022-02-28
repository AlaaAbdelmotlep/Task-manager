const express = require('express')

// connect to DB
require('./db/mongoose')

// require routers
const userRouter = require('./routers/user.route')
const taskRouter = require('./routers/task.route')

// create server
const app = express();

// define PORT number
const port = process.env.PORT || 3000

// parsing req.body to object
app.use(express.json())

// here we register MW in app server
// app.use((req,res,next) => {
//     res.status(503).send('webSite under maintenance, Tyr again later')
// })

// register routes
app.use(userRouter)
app.use(taskRouter)

// make server listen to PORT
app.listen(port, () => {
    console.log(`Server is listen ${port}`)
})

// Testing bcrypt
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

// Testing JWT
// const jwt = require('jsonwebtoken');
// const myFun = async () => {
//     // sign return token
//     // const token = jwt.sign({ data embeded in ur token}, "secertKey", {options})
//     const token = jwt.sign({ _id: "2" }, "secertKey", {expiresIn : "45h"})
//     console.log(token)
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyIiwiaWF0IjoxNjQ1ODY0MDQ2fQ.dxhdTlY4bCNB5VJoUdsNlqBhwLyMj8TcuaacKKDaHzk
//     // based64 encoded json string(header)(meta info about what type of token is it => JWT & algo used to generate it).P1
//     // payload OR body is based64 encoded json string(contain data provide (_id))P2
//     // signature to verfiy token P3
//     // JWT -=> create data that verifiable vie signature
//     const data = jwt.verify(token, "secertKey")
//     console.log(data)
//     // { _id: '2', iat: 1645864871 }
// }
// myFun()

// How toJSON works
// const pet = {
//     name: "alaa"
// }
// express calling JSON.stringify() behind the scane
// console.log(JSON.stringify(pet)) //{"name":"alaa"}

// here we can manage what return from object
// pet.toJSON = function () {
//     return {}
// }
// console.log(JSON.stringify(pet)) // {}