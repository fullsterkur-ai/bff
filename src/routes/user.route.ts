import { Router } from 'express'

import {
  createUser,
  deleteMe,
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateMe,
  updateUser,
} from '../controllers/user.controller'
import { adminProtected, protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', protect, adminProtected, getUsers)
router.post('/', createUser)
router.get('/me', protect, getMe)
router.patch('/me', protect, updateMe)
router.delete('/me', protect, deleteMe)
router.get('/:id', protect, adminProtected, getUser)
router.patch('/:id', protect, adminProtected, updateUser)
router.delete('/:id', protect, adminProtected, deleteUser)

export default router
