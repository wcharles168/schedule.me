require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const url = process.env.DB_SERVER
const dbName = process.env.DB

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
  
    // Storing a reference to the database so you can use it later
    db = client.db(dbName)
    db.createCollection("users", (err, res) => {
        if (err) throw err;
        console.log("Users created!");
        client.close();
    })
    db.createCollection("events", (err, res) => {
        if (err) throw err;
        console.log("Events created!");
        client.close();
    })
    db.createCollection("availabilities", (err, res) => {
        if (err) throw err;
        console.log("Availabilities created!");
        client.close();
    })
  })