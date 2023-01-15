import { Router } from "express"
import * as postsCtrl from '../controllers/movies.js'

const router = Router()

router.get('/new', postsCtrl.new)

export {
  router
}