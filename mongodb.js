// CURD Operation

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017"
const dataBaseName = "task-app"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
    if (error) {
        return console.log("Unable to connect")
    }
    const db = client.db(dataBaseName)

    // db.collection("user").insertOne({
    //     name: "Alaa Moahmoed",
    //     age:25
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert Document")
    //     }

    //     console.log("Documents inserted")
    // })

    // db.collection("tasks").insertMany([
    //     {
    //         description: "Node.js course",
    //         compelete: true
    //     },
    //     {
    //         description: "Clean my home",
    //         compelete: false
    //     },
    //     {
    //         description: "take Shower",
    //         compelete: true
    //     }
        
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert Document")
    //     }

    //     console.log("Documents inserted")
    // })

    

})
