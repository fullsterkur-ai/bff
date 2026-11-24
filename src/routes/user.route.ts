import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller'
import { adminProtected, protect } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', protect, adminProtected, getUsers)
router.post('/', createUser)
router.get('/:id', protect, adminProtected, getUser)
router.patch('/:id', protect, adminProtected, updateUser)
router.delete('/:id', protect, adminProtected, deleteUser)

export default router
