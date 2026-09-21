import { Link } from 'react-router'
import accessories from '@/assets/category_icons/accessories.png'
import backInStock from '@/assets/category_icons/back_in_stock.png'
import flannel from '@/assets/category_icons/flannel.png'
import shirtPolo from '@/assets/category_icons/shirt_polo.png'
import limitedOffers from '@/assets/category_icons/limited_offers.png'
import modestWear from '@/assets/category_icons/modest_wear.png'
import newArrivals from '@/assets/category_icons/new_arrivals.png'
import outerwear from '@/assets/category_icons/outerwear.png'
import pants from '@/assets/category_icons/pants.png'
import sale from '@/assets/category_icons/sale.png'
import tShirt from '@/assets/category_icons/t_shirt.png'
import sweaterCardigan from '@/assets/category_icons/sweeter_cardigan.png'
import underwear from '@/assets/category_icons/underwear.png'

const categories = [
  { img: flannel, name: "Flannel", path: "/browse/category/flannel" },
  { img: shirtPolo, name: "Shirt & Polo", path: "/browse/category/kemeja-polo" },
  { img: modestWear, name: "Modest Wear", path: "/browse/category/modest-wear" },
  { img: outerwear, name: "Outerwear", path: "/browse/category/outerwear" },
  { img: pants, name: "Pants", path: "/browse/category/pants" },
  { img: tShirt, name: "T-Shirt", path: "/browse/category/shirt" },
  { img: sweaterCardigan, name: "Sweater & Cardigan", path: "/browse/category/sweater-cardigan" },
  { img: accessories, name: "Accessories", path: "/browse/category/accessories" },
  { img: underwear, name: "Underwear", path: "/browse/category/underwear" },
  { img: newArrivals, name: "New Arrivals", path: "/browse/category/new-arrivals" },
  { img: backInStock, name: "Back in Stock", path: "/browse/category/back-in-stock" },
  { img: limitedOffers, name: "Limited Offers", path: "/browse/category/limited-offers" },
  { img: sale, name: "Sale", path: "/browse/category/sale" },
];

export default function FindByCategory() {
  return (
    <section className="my-10 sm:px-0 md:px-4 lg:px-12 xl:px-36 flex flex-col items-center">
      <div className="w-full flex text-xl">
        <h2>Find By Category</h2>
      </div>

      <div className="mt-4 grid grid-cols-4 md:grid-cols-6 grid-flow-row gap-y-6 gap-x-10 text-center text-sm cursor-pointer">
        {categories.map(({ img, name, path }) => (
          <Link key={name} to={`/browse/${path}`}>
            <div className='mb-auto px-8 flex justify-center items-center'>
              <img
                src={img}
                alt={name}
                className='w-24'
              />
            </div>
            <span className='mt-2'>{name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 py-3 w-[40%] flex justify-center border rounded-4xl cursor-pointer select-none">See All Category</div>
    </section>
  )
}