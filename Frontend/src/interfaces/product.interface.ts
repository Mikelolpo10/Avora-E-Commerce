export type department = "women" | "man" | "unisex"
export type status = "active" | "inactive" | "draft"

export interface Variant {
  id: string;
  sku: string;
  size: string;
  color_name: string;
  color_code: string;
  price: number;
  stock: number;
  is_default: boolean;
}
export interface Product {
  id: string;
  category_id: number;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  department: department;
  material: string;
  status: status;
  created_at: string;
  updated_at: string;
  price: number;
  perawatan: string;
  variants: Variant[];
}

export interface TopSellerProductData {
  name: string;
  img: string;
  colors: string[];
}