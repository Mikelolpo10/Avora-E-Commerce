import type { Product } from "./product.interface.js";


export interface Discount extends Product {
  promotion_product_id: string;
  promotion_id: string;
  product_id: string;
  discount: number;
  start_at: string;
  end_at: string;
}