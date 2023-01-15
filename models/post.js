import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, required: true},
  creator: { type: Schema.Types.ObjectId, ref: 'Profile'},
  date: Date,
  textarea: { type: String, required: true },
  image: String,
  category: { enum: ["Architecture", "Construction", "Permits"] },
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}