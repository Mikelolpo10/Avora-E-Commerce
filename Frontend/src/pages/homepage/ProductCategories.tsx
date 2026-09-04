import { useQuery } from "@tanstack/react-query";

import DiscountColection from "../../components/DiscountCollection";
import { getFlashSale, getTodayDeals } from "../../api/discount";
import type { Discount } from "../../interfaces/discount.interface";

export default function ProductCategories() {
  const { data: flashSaleData, isLoading } = useQuery<Discount[]>({
    queryKey: ["flash-sale"],
    queryFn: getFlashSale,
    retry: 2,
  })

  const { data: todaysDealData, isLoading: todaysDealLoading } = useQuery<Discount[]>({
    queryKey: ["todays-deals"],
    queryFn: getTodayDeals,
    retry: 2,
  })


  if (isLoading || todaysDealLoading) return null

  return (
    <section className="mx-8 lg:mx-16 flex flex-col gap-8">
      <DiscountColection
        key='Flash Sale'
        slug="flash-sale"
        title='Flash Sale'
        products={flashSaleData}
      />
      <DiscountColection
        key="Today's Deal"
        slug="todays-deal"
        title="Today's Deal"
        products={todaysDealData}
      />
    </section>
  )
}