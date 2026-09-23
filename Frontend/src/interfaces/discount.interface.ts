import type { department, status } from "./product.interface";

export interface Discount {
  promotion_product_id: string;
  promotion_id: string;
  product_id: string;
  discount: number;
  start_at: string;
  end_at: string;

  name: string;
  slug: string;
  image_url: string;
  description: string;
  department: department;
  material: string;
  status: status;
  category_id: number;

  price: number;

  category_name: string | null;
  category_slug: string | null;
}