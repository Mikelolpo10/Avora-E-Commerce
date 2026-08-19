import { Router } from "express";
import { getFlashSale, getTodaysSale } from "../controller/discount.controller.js";

const router = Router()

router.get('/flash-sale', getFlashSale)
router.get('/todays-deals', getTodaysSale)

export default router

