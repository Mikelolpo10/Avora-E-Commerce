import { Link } from "react-router";

import Reviews from "./Reviews";
import TopSeller from "./TopSeller";
import SaleSection from "./SaleSection";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

import ads1 from '@/assets/homepage_ads/ads_1.webp'
import ads2 from '@/assets/homepage_ads/ads_2.webp'
import ads3 from '@/assets/homepage_ads/ads_3.webp'
import mainAds from '@/assets/homepage_ads/main_ads.webp'
import videoAds1 from '@/assets/homepage_ads/videoAds1.mov'

// import blibli from '@/assets/logo/blibli.webp'
// import tokopedia from '@/assets/logo/tokopedia.webp'
// import shopee from '@/assets/logo/shopee.webp'
import FindByCategory from "./FindByCategory";

export default function Homepage() {
  return (
    <div className="mt-16 w-full flex flex-col bg-gray">
      <ScrollToTopButton />

      <section className="relative w-full flex min-w-0 min-h-0">
        <img
          src={mainAds}
          alt="main_ads"
          fetchPriority="high"
          className="w-full"
          height={800}
          width={2000}
        />
        <div className="absolute bottom-0 left-0 pb-24 pl-16 text-white">
          <h1 className="text-5xl font-semibold">
            Made To Last, <br />
            Made For You.
          </h1>
          <Link
            to='categories'
            className="mt-8 py-3 px-3 flex h-12 items-center justify-center rounded bg-primary text-lg font-medium shadow-2xl">
            Shop Now
          </Link>
        </div>
        {/* Tambah cta ke page categories */}
      </section>

      <FindByCategory />

      <video
        src={videoAds1}
        muted
        autoPlay
        playsInline
        loop
        preload="none"
        height={600}
        width={2000}
        className="mb-8 object-cover aspect-square md:aspect-auto"
      >
        Video is not supported
      </video>

      <div>
        <img
          src={ads1}
          alt="main_ads"
          loading="lazy"
          height={600}
          width={2000}
          className="w-full"
        />
      </div>

      <TopSeller />

      <div>
        <img
          src={ads2}
          alt="main_ads"
          loading="lazy"
          height={600}
          width={2000}
          className="w-full"
        />
      </div>

      <SaleSection />

      <div>
        <img
          src={ads3}
          alt="main_ads"
          loading="lazy"
          height={600}
          width={2000}
          className="mt-20 w-full"
        />
      </div>

      <Reviews />

      {/* <section className="mt-20 mb-16 mx-16 flex flex-col items-center bg-gray-200">
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
      </section> */}
    </div>
  )
}