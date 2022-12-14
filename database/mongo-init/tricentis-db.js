let admin = db.getSiblingDB('admin')
admin.auth('root', 'password')

db = new Mongo().getDB("tricentis-mongo-db")
db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "tricentis-mongo-db"
            }
        ]
    }
)

db.createCollection('Navigations')
db.createCollection('Product Listing Page')
db.createCollection('Product Description Page')

module.exports = { db }