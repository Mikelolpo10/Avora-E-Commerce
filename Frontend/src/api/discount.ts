import axios from "axios";
import { API_URL } from "../config/env";
import type { Discount } from "../interfaces/discount.interface";

export async function getFlashSale(): Promise<Discount[]> {
  try {
    const res = await axios.get<Discount[]>(`${API_URL}/browse/discount/flash-sale`)
    return res.data
  } catch (err) {
    throw new Error('Error fetch Flash sale', {
      cause: err
    })
  }
}

export async function getTodayDeals(): Promise<Discount[]> {
  try {
    const res = await axios.get<Discount[]>(`${API_URL}/browse/discount/todays-deals`)
    return res.data
  } catch (err) {
    throw new Error('Error fetch Todays Deals', {
      cause: err
    })
  }
}