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

  if (!departmentParam) {
    return res.status(404).json(`Department not found`);
  }

  const department = departmentParam.toLocaleLowerCase();

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

      WHERE p.department = $1

      GROUP BY p.id
      `,
      [department]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
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