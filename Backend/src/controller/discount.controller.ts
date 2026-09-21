import type { Request, Response } from 'express'
import { pool } from "../config/db.js";
import type { Discount } from '../interfaces/discount.interface.js';

export const getFlashSale = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Discount>(`
      SELECT 
        promotion_products.id AS promotion_product_id,
        promotion_products.promotion_id AS promotion_id,
        promotion_products.product_id,
        promotion_products.discount,
        promotion_products.start_at,
        promotion_products.end_at,
        products.name,
        products.slug,
        products.image_url,
        products.description,
        products.department,
        products.material,
        products.status,
        products.category_id,
        first_variant.price,
        product_categories.name AS category_name,
        product_categories.slug AS category_slug
      FROM promotion_products
      INNER JOIN products 
        ON promotion_products.product_id = products.id
      LEFT JOIN product_categories 
        ON product_categories.id = products.category_id
      INNER JOIN promotions 
        ON promotions.id = promotion_products.promotion_id
      LEFT JOIN LATERAL (
        SELECT price
        FROM product_variants
        WHERE product_variants.product_id = products.id
        ORDER BY is_default DESC
        LIMIT 1
      ) AS first_variant ON true
      WHERE promotion_products.start_at <= NOW()
        AND promotion_products.end_at >= NOW()
        AND promotions.slug = 'flash-sale';
    `)
    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTodaysSale = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Discount>(`
      SELECT 
        promotion_products.id AS promotion_product_id,
        promotion_products.promotion_id AS promotion_id,
        promotion_products.product_id,
        promotion_products.discount,
        promotion_products.start_at,
        promotion_products.end_at,
        products.name,
        products.slug,
        products.image_url,
        products.description,
        products.department,
        products.material,
        products.status,
        products.category_id,
        first_variant.price,
        product_categories.name AS category_name,
        product_categories.slug AS category_slug
      FROM promotion_products
      INNER JOIN products 
        ON promotion_products.product_id = products.id
      LEFT JOIN product_categories 
        ON product_categories.id = products.category_id
      INNER JOIN promotions 
        ON promotions.id = promotion_products.promotion_id
      LEFT JOIN LATERAL (
        SELECT price
        FROM product_variants
        WHERE product_variants.product_id = products.id
        ORDER BY is_default DESC
        LIMIT 1
      ) AS first_variant ON true
      WHERE promotion_products.start_at <= NOW()
        AND promotion_products.end_at >= NOW()
        AND promotions.slug = 'todays-deals';
    `)

    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}