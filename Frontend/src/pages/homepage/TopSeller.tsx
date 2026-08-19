import TopSellerProduct from "./TopSellerProduct";

import type { TopSellerProductData } from "../../interfaces/product.interface";

const topSellerProducts: TopSellerProductData[] = [
  {
    name: 'Polini ln 2383',
    img: './images/top_selling_1.webp',
    colors: ['#cabaaa', '#cbc2c7', '#e5dcd0', '#000000']
  }, {
    name: 'Polini ln 8803',
    img: './images/top_selling_2.webp',
    colors: ['#81877c', '#fae8cd', '#dfc2ab', '#000000']
  }, {
    name: 'Polini ln 2032',
    img: './images/top_selling_3.webp',
    colors: ['#f3ded2', '#e4915e', '#ceab93', '#e3d9cc', '#000000']
  }, {
    name: 'Polini ln 2383',
    img: './images/top_selling_4.webp',
    colors: ['#c99f82', '#969696', '#bac2b4', '#000000', '#e3c8be']
  }
]

export default function TopSeller() {
  return (
    <section className="mt-16 flex flex-col items-center justify-center bg-gray">
      <h2 className="pb-4 text-primary-black text-3xl font-bold uppercase">best seller</h2>
      <span className="text-black/75 text-sm uppercase">Our most-loved essentials, chosen by thousands.</span>
      <div className="mt-8 mb-16 px-24 flex w-full justify-between">
        {topSellerProducts.map(({ name, img, colors }, i) => (
          <TopSellerProduct
            key={i}
            name={name}
            img={img}
            colors={colors}
          />
        ))}
      </div>
    </section>
  )
}