import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


router.get('/', isLoggedIn, postsCtrl.index)
router.get('/new', isLoggedIn, postsCtrl.new)
router.get('/:id', isLoggedIn, postsCtrl.show)
router.get('/:id/edit', isLoggedIn, postsCtrl.edit)
router.get('/:postId/comments/:commentId/edit', isLoggedIn, postsCtrl.editComment)


router.post('/', isLoggedIn, postsCtrl.create)
router.post("/:id/comments", isLoggedIn, postsCtrl.addComment)


router.put('/:id', isLoggedIn, postsCtrl.update)

router.delete('/:id', isLoggedIn, postsCtrl.delete)
router.delete('/:postId/comments/:commentId', isLoggedIn, postsCtrl.deleteComment)


export {
  router
}