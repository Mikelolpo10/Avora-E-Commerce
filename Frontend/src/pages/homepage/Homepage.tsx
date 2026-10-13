import { Link } from "react-router";

import Reviews from "./Reviews";
import TopSeller from "./TopSeller";
import SaleSection from "./SaleSection";
import Ads from "./Ads";
import ScrollToTopButton from "@/components/common/SlingButton";

import ads1 from '@/assets/homepage_ads/ads_1.webp'
import ads2 from '@/assets/homepage_ads/ads_2.webp'
import ads3 from '@/assets/homepage_ads/ads_3.webp'
import mainAds from '@/assets/homepage_ads/hero_test_1.webp'
import videoAds1 from '@/assets/homepage_ads/videoAds1.mov'

import FindByCategory from "./FindByCategory";
import { ArrowUpRight } from "lucide-react";

export default function Homepage() {
  return (
    <div className="w-full flex flex-col bg-gray">
      <ScrollToTopButton />

      {/* Tambah something sedikit bagian kanan */}
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
          <span className="text-darker font-medium">
            A collection made for the way you live. Clean designs, <br />
            comfortable fabrics, and versatile pieces come together to create <br />
            effortless styles you can wear with confidence, every day. <br />
          </span>
          <Link
            to='categories'
            className="mt-4 py-3 px-3 flex h-12 w-60 items-center justify-center gap-2 rounded bg-primary text-lg font-medium shadow-black/20 shadow-lg duration-200 active:scale-90"
          >
            Shop Now
            <ArrowUpRight strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <FindByCategory />

      <Link to='/new_arrival' className="relative">
        <video
          src={videoAds1}
          muted
          autoPlay
          playsInline
          loop
          preload="none"
          height={700}
          width={2000}
          className="mb-8 object-cover aspect-square md:aspect-auto"
        >
          Video is not supported
        </video>
        <div className="absolute bottom-20 px-16 flex flex-col z-10 cursor-pointer">
          <h2 className="text-white text-shadow-sm text-shadow-black/50 text-4xl">Autumn New Arrival</h2>
          <p className="mt-4 text-white text-shadow-xs text-shadow-black/70 text-[17px]">
            Discover effortless styles made for the season — refined essentials,<br />
            soft layers, and timeless comfort for every autumn day.
          </p>
        </div>
      </Link>

      <Ads
        url='/new_arrival'
        src={ads1}
        alt='Limited Time Offers'
        title='Limited Time Offers'
        paragraph='Enjoy exclusive prices on selected styles and discover your favorites before these special offers come to an end.'
      />

      <TopSeller />

      <Ads
        url='/categories/accesories'
        src={ads2}
        alt='Discover Our Accesories'
        title='Discover Our Accesories'
        paragraph='Find the finishing touches that make an outfit yours — durable materials, clean designs, and effortless style for any occasion.'
      />

      <SaleSection />

      <Ads 
        url='/department/kids'
        src={ads3}
        alt={'Explore The Little World'}
        title={'Explore The Little World'}
        paragraph="Discover playful styles and comfy essentials made for every little adventure."
      />

      <Reviews />
    </div>
  )
}