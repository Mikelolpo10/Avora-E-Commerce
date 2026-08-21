type department = "women" | "man" | "unisex"
type status = "active" | "inactive" | "draft"


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
}

export interface TopSellerProductData {
  name: string;
  img: string;
  colors: string[];
}