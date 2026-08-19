import { Link } from "react-router";
import Reviews from "./Reviews";
import TopSeller from "./TopSeller";
import ProductCategories from "./ProductCategories";
import mainAds from '../../assets/main_ads.png'
import blibli from '../../assets/logo/blibli.png'
import tokopedia from '../../assets/logo/tokopedia.png'
import shopee from '../../assets/logo/shopee.png'

export default function Homepage() {
  return (
    <>
      <div className="mt-16 w-full flex flex-col bg-gray">
        <section className="relative px-16 w-full flex min-w-0 min-h-0">
          <h1 className="absolute top-16 left-[50%] text-primary text-4xl font-semibold translate-x-[-50%]">Made To Last, Made For You.</h1>
          <img src={mainAds} alt="" className="" />
        </section>

        <TopSeller />

        <Reviews />
        {/* Posisi nanti harus dituker tuker */}

        {/* Product Categories */}
        <ProductCategories />

        <section className="mt-20 mb-16 mx-16 flex flex-col items-center bg-gray-dark">
          <h2 className="mt-10 mb-12 text-4xl font-bold">OUR MARKETPLACE!</h2>
          <div className="mb-16 px-60 w-full flex justify-between">
            <Link to='https://www.blibli.com/brand/polini' target="_blank" className="p-2 flex items-center h-24 w-44 rounded-xl transition-all hover:bg-white hover:scale-110">
              <img src={blibli} alt="Blibli" className="w-full h-full" />
            </Link>
            <Link to='https://shopee.co.id/poliniofficialshop' target="_blank" className="py-2 px-6 flex items-center h-26 w-28 -translate-x-12 rounded-xl transition-all hover:bg-white hover:scale-110">
              <img src={shopee} alt="Blibli" className="w-full h-full" />
            </Link>
            <Link to='https://www.tokopedia.com/poliniofficialshop' target="_blank" className="p-2 flex items-center h-26 w-28 rounded-xl transition-all hover:bg-white hover:scale-110">
              <img src={tokopedia} alt="Blibli" className="w-full h-full" />
            </Link>
          </div>
        </section>
      </div>

    </>
  )
}