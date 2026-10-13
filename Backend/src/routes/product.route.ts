import { Router } from 'express'
import { getProductsByCategories, getProductBySlug, getProductsByDepartment, similar, trending } from '../controller/product.controller.js'

const router = Router()

router.get('/trending', trending)
router.get('/department/:department', getProductsByDepartment)
router.get('/category/:category', getProductsByCategories)
router.get('/similar/:productSlug', similar)
router.get('/:productSlug', getProductBySlug)

export default router