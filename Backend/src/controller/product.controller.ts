import type { Request, Response } from 'express'
import { pool } from '../config/db.js'
import type { Product } from '../interfaces/product.interface.js';

interface CategoryParams {
  category: string;
}
interface CategoryRow {
  id: number;
}

export const getProductsByCategories = async (req: Request<CategoryParams>, res: Response) => {
  const categorySlug: string = req.params.category.toLocaleLowerCase()

  if (!categorySlug) return res.status(404).json(`Product Category not found`)

  try {
    const categoryId = await pool.query<CategoryRow>('SELECT id FROM product_categories WHERE slug = $1', [categorySlug])

    if (categoryId.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const result = await pool.query<Product[]>('SELECT * FROM products WHERE category_id = $1', [categoryId.rows[0]?.id])
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getProductsByDepartment = async (req: Request, res: Response) => {
  const departmentParam = req.params.department as string;
  const sortParam = (req.query.sort as string) || 'best-match';

  if (!departmentParam) {
    return res.status(404).json({
      message: 'Department not found',
    });
  }

  const department = departmentParam.toLowerCase();

  const sortMap: Record<string, string> = {
    'best-match': 'p.id ASC',
    'price-low-high': 'min_price ASC NULLS LAST',
    'price-high-low': 'min_price DESC NULLS LAST',
    'most-popular': 'p.sold_count DESC NULLS LAST',
    'highest-rating': 'avg_rating DESC NULLS LAST',
    'most-reviews': 'review_count DESC NULLS LAST',
  };

  const orderBy = sortMap[sortParam] ?? sortMap['best-match'];

  try {
    const result = await pool.query(
      `
      WITH product_reviews AS (
        SELECT
          pv.product_id,
          AVG(r.rating) AS avg_rating,
          COUNT(*) AS review_count
        FROM reviews r
        JOIN order_items oi
          ON oi.id = r.order_item_id
        JOIN product_variants pv
          ON pv.id = oi.product_variant_id
        GROUP BY pv.product_id
      )

      SELECT 
        p.*,

        MIN(pv.price) AS min_price,

        COALESCE(pr.avg_rating, 0) AS avg_rating,

        COALESCE(pr.review_count, 0) AS review_count,

        COALESCE(
          json_agg(
            json_build_object(
              'id', pv.id,
              'sku', pv.sku,
              'size', pv.size,
              'color_name', pv.color_name,
              'color_code', pv.color_code,
              'price', pv.price,
              'stock', pv.stock,
              'is_default', pv.is_default
            )
            ORDER BY 
              pv.color_name,
              CASE pv.size
                WHEN 'S' THEN 1
                WHEN 'M' THEN 2
                WHEN 'L' THEN 3
                WHEN 'XL' THEN 4
                WHEN 'XXL' THEN 5
                ELSE 999
              END
          ) FILTER (WHERE pv.id IS NOT NULL),
          '[]'
        ) AS variants

      FROM products p

      LEFT JOIN product_variants pv
        ON pv.product_id = p.id

      LEFT JOIN product_reviews pr
        ON pr.product_id = p.id

      WHERE p.department = $1

      GROUP BY
        p.id,
        pr.avg_rating,
        pr.review_count

      ORDER BY ${orderBy}
      `,
      [department]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { productSlug } = req.params;

  if (!productSlug) {
    return res.status(400).json({
      message: "Product slug is required",
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pv.id,
              'sku', pv.sku,
              'size', pv.size,
              'color_name', pv.color_name,
              'color_code', pv.color_code,
              'price', pv.price,
              'stock', pv.stock,
              'is_default', pv.is_default
            )
            ORDER BY 
              pv.color_name,
              CASE pv.size
                WHEN 'S' THEN 1
                WHEN 'M' THEN 2
                WHEN 'L' THEN 3
                WHEN 'XL' THEN 4
                WHEN 'XXL' THEN 5
              END
          ) FILTER (WHERE pv.id IS NOT NULL),
          '[]'
        ) AS variants

      FROM products p

      LEFT JOIN product_variants pv
        ON pv.product_id = p.id

      WHERE p.slug = $1

      GROUP BY p.id
      `,
      [productSlug]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getSimilarProducts = async (req: Request, res: Response) => {
  const { productSlug } = req.params;

  const productResult = await pool.query(
    `
    SELECT category_id, department, material, price
    FROM products
    WHERE slug = $1
    `,
    [productSlug]
  );

  if (productResult.rows.length === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const product = productResult.rows[0];

  const result = await pool.query(
    `
    SELECT 
      p.*,

      COALESCE(
        json_agg(
          json_build_object(
            'id', pv.id,
            'sku', pv.sku,
            'size', pv.size,
            'color_name', pv.color_name,
            'color_code', pv.color_code,
            'price', pv.price,
            'stock', pv.stock,
            'is_default', pv.is_default
          )
          ORDER BY 
            pv.color_name,
            CASE pv.size
              WHEN 'S' THEN 1
              WHEN 'M' THEN 2
              WHEN 'L' THEN 3
              WHEN 'XL' THEN 4
              WHEN 'XXL' THEN 5
            END
        ) FILTER (WHERE pv.id IS NOT NULL),
        '[]'
      ) AS variants,

      (
        CASE 
          WHEN p.category_id = $1 THEN 50 
          ELSE 0 
        END +

        CASE 
          WHEN p.department = $2 THEN 20 
          ELSE 0 
        END +

        CASE 
          WHEN p.material = $3 THEN 20 
          ELSE 0 
        END +

        CASE
          WHEN p.price BETWEEN $4 * 0.8 AND $4 * 1.2
          THEN 10
          ELSE 0
        END
      ) AS similarity_score

    FROM products p

    LEFT JOIN product_variants pv
      ON pv.product_id = p.id

    WHERE p.slug != $5
      AND p.status = 'active'

    GROUP BY p.id

    ORDER BY similarity_score DESC

    LIMIT 6;
    `,
    [
      product.category_id,
      product.department,
      product.material,
      product.price,
      productSlug,
    ]
  );

  return res.status(200).json(result.rows);
};