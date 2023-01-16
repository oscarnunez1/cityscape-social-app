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
  console.log("showing the content", req.body)
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

function update(req, res) {
  for (const key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      post.updateOne(req.body)
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
    } else {
      throw new Error('Unauthorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function deletePost(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      post.delete()
      .then(() => {
        res.redirect('/posts')
      })
    } else {
      throw new Error ('Unauthorized')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function createComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    console.log(movie);
    post.comments.push(req.body)
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}



export {
  index,
  newPost as new,
  create,
  show,
  edit,
  update,
  deletePost as delete,
  createComment
}