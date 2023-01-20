import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  commenter: { type: Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const postSchema = new Schema({
  title: { type: String, required: true},
  textarea: { type: String, required: true },
  image: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema],
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}