const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = "mongodb+srv://admin:admin@achievements-store.eo0qiqt.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'store'

let db

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
        db = client.db(dbName)
    })

const insertAchievement = (item) => {
    const collection = db.collection('achievements')
    return collection.insertOne(item)
}

const getAchievements = (user_name) => {
    const collection = db.collection('achievements')
    return collection.find({ 'user_name': user_name }).toArray()
}

const createUser = (user) => {
    const collection = db.collection('users')
    return collection.insertOne(user)
}

module.exports = { init, insertAchievement, getAchievements, createUser }