const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_DB_URI

mongoose.connect(
    URI,
    {
        dbName: process.env.MONGO_DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to mongo DB')
    }).catch((err) => {
        console.log(err.message)
    })

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
