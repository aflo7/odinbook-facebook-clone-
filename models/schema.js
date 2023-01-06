const { boolean } = require("mathjs")
const mongoose = require("mongoose")
const { Schema } = mongoose

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  following: [{type: Schema.Types.ObjectId, ref: "User", required: true}],
  settings: {darkMode: {type: Boolean, default: false}}
})

const Post = new Schema({
  posterId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  posterName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" , default: []}]
})

const Comment = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  cpid: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const userSchema = mongoose.model("User", User)
const postSchema = mongoose.model("Post", Post)
const commentSchema = mongoose.model("Comment", Comment)

module.exports = { User: userSchema, Post: postSchema, Comment: commentSchema }
