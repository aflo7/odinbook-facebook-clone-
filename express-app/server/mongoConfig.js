var mongoose = require("mongoose")

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))