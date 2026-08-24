import { pool } from "../config/db.js";
export const getFlashSale = async (req, res) => {
    try {
        const result = await pool.query(`
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
        products.gender,
        products.material,
        products.status,
        products.category_id,
        products.price,
        product_categories.name AS category_name,
        product_categories.slug AS category_slug
      FROM promotion_products
      INNER JOIN products ON promotion_products.product_id = products.id
      LEFT JOIN product_categories ON product_categories.id = products.category_id
      INNER JOIN promotions ON promotions.id = promotion_products.promotion_id
      WHERE promotion_products.start_at <= NOW()
      AND promotion_products.end_at >= NOW()
      AND promotions.slug = 'flash-sale';
    `);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getTodaysSale = async (req, res) => {
    try {
        const result = await pool.query(`
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
        products.gender,
        products.material,
        products.status,
        products.category_id,
        products.price,
        product_categories.name AS category_name,
        product_categories.slug AS category_slug
      FROM promotion_products
      INNER JOIN products ON promotion_products.product_id = products.id
      LEFT JOIN product_categories ON product_categories.id = products.category_id
      INNER JOIN promotions ON promotions.id = promotion_products.promotion_id
      WHERE promotion_products.start_at <= NOW()
      AND promotion_products.end_at >= NOW()
      AND promotions.slug = 'todays-deals';
    `);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
//# sourceMappingURL=discount.controller.js.map