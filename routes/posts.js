import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


router.get('/', isLoggedIn, postsCtrl.index)

router.get('/new', isLoggedIn, postsCtrl.new)

router.post('/', isLoggedIn, postsCtrl.create)

router.get('/:id', isLoggedIn, postsCtrl.show)

router.get('/:id/edit', isLoggedIn, postsCtrl.edit)

export {
  router
}