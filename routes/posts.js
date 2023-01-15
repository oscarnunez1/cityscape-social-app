import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'

const router = Router()


router.get('/new', postsCtrl.new)

// router.post('/', postsCtrl.create)

export {
  router
}