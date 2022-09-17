const mongoose = require('mongoose')

const URI = 'mongodb://root:password@0.0.0.0:27017/tricentis-mongo-db?authSource=admin'

mongoose.connect(
    URI,
    {
        dbName: 'tricentis-mongo-db',
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