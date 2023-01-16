import { Post } from "../models/post.js"

function index(req, res) {
  Post.find({})
  .populate("owner")
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

function newPost(req, res) {;
  res.render("posts/new", {
    title: "Create Post",
  })
}

function create(req, res) {
  console.log("CREATING POST", req.body);
  req.body.owner = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    res.redirect("/posts")
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

function edit(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/edit', {
      post,
      title: "Edit Post"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/posts")
  })
}

export {
  index,
  newPost as new,
  create,
  show,
  edit,
}