import { Post } from "../models/post.js"

function newPost(req, res) {
  console.log('Lets make a new post!');
  res.render("posts/new", {
    title: "Create Post"
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  console.log("create post", req.body)
  Post.create(req.body)
  .then(post => {
    res.redirect("/posts")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/posts")
  })
}

export {
  newPost as new,
  create,
}