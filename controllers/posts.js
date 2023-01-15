import { Post } from "../models/post.js"

function newPost(req, res) {
  console.log('Lets make a new post!');
  res.render("posts/new", {
    title: "Create Post"
  })
}

// function create(req, res) {
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.
//   }
// }

export {
  newPost as new
}