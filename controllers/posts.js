import { Post } from "../models/post.js"

function newPost(req, res) {
  res.render("posts/new", {
    title: "Create Post"
  })
}

export {
  newPost as new
}