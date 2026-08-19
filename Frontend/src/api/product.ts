import axios from "axios";
import { API_URL } from "../config/env";
import type { Product } from "../interfaces/product.interface";


export async function getProductBySlug(slug: string): Promise<Product> {
  if (!slug) throw new Error("Product ID is required");

  try {
    const res = await axios.get<Product>(`${API_URL}/browse/products/${slug}`)
    return res.data
  } catch (err) {
    throw new Error(`Error while fetching ${slug}`, {
      cause: err
    })
  }
}


export async function getProductByCategory(category: string): Promise<Product[]> {
  try {
    const res = await axios.get<Product[]>(`${API_URL}/browse/products/category/${category}`)
    return res.data
  } catch (err) {
    throw new Error(`Error while fetching ${category}`, {
      cause: err
    })
  }
}

export async function getProductsByDepartment(department: string): Promise<Product[]> {
  try {
    const res = await axios.get<Product[]>(`${API_URL}/browse/products/department/${department}`)
    return res.data
  } catch (err) {
    throw new Error(`Error while fetching ${department}`, {
      cause: err
    })
  }
}

export async function getSimilarProducts(slug: string): Promise<Product[]> {
  try {
    const res = await axios.get<Product[]>(`${API_URL}/browse/products/getsimilarproducts/${slug}`)
    return res.data
  } catch (err) {
    throw new Error(`Error while fetching similar products to ${slug}`, {
      cause: err
    })
  }
}
