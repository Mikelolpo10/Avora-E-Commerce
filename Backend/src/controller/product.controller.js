import { pool } from '../config/db.js';
export const getProductsByCategories = async (req, res) => {
    const categorySlug = req.params.category.toLocaleLowerCase();
    if (!categorySlug)
        return res.status(404).json(`Product Category not found`);
    try {
        const categoryId = await pool.query('SELECT id FROM product_categories WHERE slug = $1', [categorySlug]);
        if (categoryId.rows.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        const result = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId.rows[0]?.id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getProductsByDepartment = async (req, res) => {
    const departmentParam = req.params.department;
    if (!departmentParam) {
        return res.status(404).json(`Department not found`);
    }
    const department = departmentParam.toLocaleLowerCase();
    try {
        const result = await pool.query('SELECT * FROM products WHERE department = $1', [department]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getProductBySlug = async (req, res) => {
    const productSlug = req.params.productSlug;
    if (!productSlug)
        return res.status(404).json(`product slug is required`);
    if (!productSlug) {
        return res.status(400).json({
            message: "Invalid product slug",
        });
    }
    try {
        const result = await pool.query('SELECT * FROM products WHERE slug = $1', [productSlug]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getSimilarProducts = async (req, res) => {
    const slug = req.params.productSlug;
    const productResult = await pool.query(`
    SELECT category_id, department, material, price
    FROM products
    WHERE slug = $1
    `, [slug]);
    if (productResult.rows.length === 0) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    const product = productResult.rows[0];
    const result = await pool.query(`
    SELECT *,
      (
        CASE WHEN category_id = $1 THEN 50 ELSE 0 END +
        CASE WHEN department = $2 THEN 20 ELSE 0 END +
        CASE WHEN material = $3 THEN 20 ELSE 0 END +
        CASE
          WHEN price BETWEEN $4 * 0.8 AND $4 * 1.2
          THEN 10
          ELSE 0
        END
      ) AS similarity_score
    FROM products
    WHERE slug != $5
      AND status = 'active'
    ORDER BY similarity_score DESC
    LIMIT 6;
    `, [
        product.category_id,
        product.department,
        product.material,
        product.price,
        slug
    ]);
    res.json(result.rows);
};
//# sourceMappingURL=product.controller.js.map