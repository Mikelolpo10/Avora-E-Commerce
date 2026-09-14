import axios from "axios";
import { API_URL } from "../config/env";
import type { Product } from "../interfaces/product.interface";
import type { CheckedFilter } from "@/interfaces/filter.interface";


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

export async function getProductsByDepartment(department: string, sortBy: string, appliedFilters: CheckedFilter[]): Promise<Product[]> {
  const params: Record<string, string> = {};

  appliedFilters.forEach((item) => {
    if (typeof item.value === "object" && item.value !== null) {
      params["priceMin"] = item.value.min;
      params["priceMax"] = item.value.max;
    } else {
      const existing = params[item.filter];
      params[item.filter] = existing ? `${existing},${item.value}` : String(item.value);
    }
  });

  try {
    const res = await axios.get<Product[]>(`${API_URL}/browse/products/department/${department}?sort=${sortBy}`, { params })
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
