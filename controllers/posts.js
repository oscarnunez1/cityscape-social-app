import { Post } from "../models/post.js"

function index(req, res) {
  Post.find({})
  .populate("owner")
  .then(posts => {
    res.render('posts/index', {
      posts: posts,
      title: 'Home'
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
  .populate("owner")
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
    req.body.commenter = req.user.profile._id
    post.comments.push(req.body)
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/posts")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/posts")
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      post.comments.remove({_id: req.params.commentId})
      taco.save()
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/posts')
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




export {
  index,
  newPost as new,
  create,
  show,
  edit,
  update,
  deletePost as delete,
  createComment,
  deleteComment,
}