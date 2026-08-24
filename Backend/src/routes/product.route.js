import { Router } from 'express';
import { getProductsByCategories, getProductBySlug, getSimilarProducts, getProductsByDepartment } from '../controller/product.controller.js';
const router = Router();
router.get('/:productSlug', getProductBySlug);
router.get('/department/:department', getProductsByDepartment);
router.get('/category/:category', getProductsByCategories);
router.get('/getsimilarproducts/:productSlug', getSimilarProducts);
export default router;
//# sourceMappingURL=product.route.js.map