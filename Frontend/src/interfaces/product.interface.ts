type gender = "women" | "man" | "unisex"
type status = "active" | "inactive" | "draft"


export interface Product {
  id: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  gender: gender;
  material: string;
  status: status;
  created_at: string;
  updated_at: string;
  price: number;
}

export interface TopSellerProductData {
  name: string;
  img: string;
  colors: string[];
}