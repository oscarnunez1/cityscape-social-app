import { Post } from "../models/post.js"

function newPost(req, res) {
  console.log('Lets make a new post!');
  res.render("posts/new", {
    title: "Create Post",
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

function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      posts: posts,
      title: 'Post Feed'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/posts")
  })
}

function show(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/show', {
      title: 'Post Details',
      post: post
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/posts")
  })
}

export {
  newPost as new,
  create,
  index,
  show, 
}