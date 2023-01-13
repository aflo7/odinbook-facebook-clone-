//// mongoConfigTesting.js
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
let db = null
let mongoServer = null

async function initializeMongoServer() {
   mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  mongoose.set("strictQuery", false)

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db = mongoose.connection

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e)
      mongoose.connect(mongoUri)
    }
    console.log(e)
  })

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`)
  })
}
async function closeMongoServer() {
  await db.close()
  await mongoServer.stop()
}

module.exports = { initializeMongoServer, closeMongoServer }
