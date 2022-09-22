const { mongoose } = require('mongoose')
const { db } = require('./connection')

const getAllCollections = async () => {
    return new Promise(function (resolve, reject) {
        db.then(async (db) => {
            resolve(await db.collections())
        })
    })
}

const getCollection = async (collection) => {
    return new Promise(function (resolve, reject) {
        db.then(async (db) => {
            resolve(await db.collection(collection))
        })
    })
}

/**
 * Delete the collection from the database
 * @param {string} collectionName
 * @return {Promise<*>}
 */
const dropCollection = (collectionName) => {
    return new Promise(function (resolve, reject) {
        mongoose.connection.dropCollection(collectionName, function (err, result) {
            let notFound = `\n  Dropping Collection '${collectionName}': Not Found!`
            let success = `\n  Dropping Collection '${collectionName}': Success!`
            let failure = `\n  Droppping Collection '${collectionName}' Error! ${err}`

            if (err) {
                //if it doesn't exist, it's not an error.
                if (err.message.includes("not found")) {
                    resolve(notFound);
                } else {
                    reject(failure);
                }
            }
            if (result) {
                resolve(success);
            }
            resolve(success);
        })
    })
}

/**
 * Deletes/Drops the collection from the database
 * @param {string} collectionName
 */
const drop = (collectionName) => {
    dropCollection(collectionName).then((message) => {
        console.log(message)
    }).catch((message) => {
        console.log(message)
    })
}

/**
 * Empty all the collections in the database
 */
const emptyAllCollections = async () => {
    let collections = await getAllCollections()
    for (collection of collections) {
        collection.deleteMany({})
    }
}

/**
 * Empty collection in the database
 * @param {string} collectionName
 */
const emptyCollection = async (collectionName) => {
    let collection = await getCollection(collectionName)
    collection.deleteMany({})
}

const dropDatabase = async () => {
    await db.then(async (db) => {
        await db.dropDatabase()
    })
}

module.exports = { dropDatabase, dropCollection, emptyAllCollections, emptyCollection }

