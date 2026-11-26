import { Router } from 'express'
import { getLiftAnalyzer } from '../controllers/lift-analyzer.controller'

const router = Router()

router.get('/', getLiftAnalyzer)

export default router
