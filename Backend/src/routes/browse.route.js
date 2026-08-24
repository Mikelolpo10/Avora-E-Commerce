import { Router } from "express";
import productRouter from "./product.route.js";
import discountRouter from "./discount.route.js";
const router = Router();
router.use('/products', productRouter);
router.use('/discount', discountRouter);
export default router;
//# sourceMappingURL=browse.route.js.map