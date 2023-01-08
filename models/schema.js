// const { boolean } = require("mathjs")
const mongoose = require("mongoose")
const { Schema } = mongoose

const User = new Schema({
  nonFacebookUserImg: {
    data: Buffer,
    contentType: String
  },
  creationDate: { type: Date },
  // fields for LocalStrategy login
  username: { type: String },
  password: { type: String },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  settings: { darkMode: { type: Boolean, default: false } },

  // fields common to both login strategies
  name: { type: String, required: true, unique: true },

  //fields for FacebookStrategy login
  isFacebookUser: { type: Boolean },
  facebookId: { type: String },
  pfpUrl: { type: String }
})

const Post = new Schema({
  posterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  posterName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }]
})

const Comment = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  cpid: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const userSchema = mongoose.model("User", User)
const postSchema = mongoose.model("Post", Post)
const commentSchema = mongoose.model("Comment", Comment)
// const facebookUserSchema = mongoose.model("FacebookUser", FacebookUser)

module.exports = {
  User: userSchema,
  Post: postSchema,
  Comment: commentSchema
}
