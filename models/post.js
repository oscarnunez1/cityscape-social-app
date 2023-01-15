import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, required: true},
  date: Date,
  textarea: { type: String, required: true },
  image: String,
  creator: { type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})