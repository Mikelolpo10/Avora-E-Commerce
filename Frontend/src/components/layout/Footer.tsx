import { Link } from "react-router"
import Divider from "../common/Divider"
import location from '@/assets/location.webp'
import whatsapp from '@/assets/whatsapp.webp'
import email from '@/assets/email.webp'
import facebook from '@/assets/logo/facebook-logo.webp'
import twitter from '@/assets/logo/twitter.webp'
import instagram from '@/assets/logo/instagram.webp'
import youtube from '@/assets/logo/youtube.webp'

const footerSections = [
  {
    title: "Shop",
    links: [
      { name: "Everyday Wear", href: "/browse/everyday-wear" },
      { name: "Sportswear", href: "/browse/sportswear" },
      { name: "Bundles", href: "/browse/bundles" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Lokasi", href: "/location" },
      { name: "Panduan", href: "/guide" },
    ],
  }
];

const helpSection = {
  title: "Help",
  links: [
    { name: "Customer Care", href: "/help/customer-care" },
    { name: "Pengiriman & Pengembalian", href: "/help/shipping-return" },
    { name: "Panduan Ukuran", href: "/help/size-guide" },
    { name: "Terms & Condition", href: "/help/terms-condition" },
    { name: "Faq", href: "/help/faq" },
  ]
}


export default function Footer() {
  return (
    <footer className="bg-accent">
      <div className="
        px-6 py-10
        md:px-12
        lg:px-24
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-10 
        text-primary-black
      ">
        <div>
          <h3 className="text-lg font-bold">Daftar untuk dapatkan informasi terbaru, penawaran ekslusif, serta Diskon hingga 15% untuk pesanan pertama.</h3>
          <form className="mt-4 h-12 flex">
            <input type="email" placeholder="Enter your email" className="pl-4 h-full w-full border-b-2 border-b-black text-black text-sm placeholder:text-black placeholder:text-sm" />
            <button className="ml-4 px-4 h-full min-w-30 bg-black text-white text-sm hover:cursor-pointer">Sign me up!</button>
          </form>
          <h3 className="mt-8 text-primary-black text-lg font-bold">Hubungi Kami</h3>
          <div className="mt-4 flex flex-col gap-2">
            <span>Butuh bantuan? Kami siap membantu!</span>
            <Link to='https://maps.app.goo.gl/fXoTAq765GiKTpPC8' className="h-12 flex items-center justify-center bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-primary">
              <img src={location} alt="Location" className="w-8" /> Jl. Kebon kacang III no 4-B Ruko Tanah Abang
            </Link>
            {/* NANTI HAPUS BG LOCATION */}
            <Link to='' className="h-12 flex items-center justify-center bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-primary">
              <img src={whatsapp} alt="Whatsapp" className="w-8" /> WA kami di +62 813-8802-0043
            </Link>
            <Link to='mailto:info@polini.co.id' className="h-12 flex items-center justify-center bg-black text-white text-sm font-semibold transition-all duration-300 hover:bg-primary">
              <img src={email} alt="Email" className="mr-2 w-5" /> Email kami di info@polini.co.id
            </Link>
          </div>
        </div>

        <div>
          {footerSections.map((section, index) => (
            <div className={index > 0 ? "mt-8" : ""}>
              <h4 className="mb-2 font-semibold">{section.title}</h4>

              <ul className="space-y-2 text-[15px]">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-primary-black transition-colors hover:text-pink-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div key={helpSection.title}>
          <h4 className="mb-2 font-semibold">{helpSection.title}</h4>

          <ul className="space-y-2 text-[15px]">
            {helpSection.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-primary-black transition-colors hover:text-pink-600"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Divider color="ash" />

      <div className="py-8 px-24 flex w-full items-center justify-between text-ash text-md">
        <small>
          Copyright © 2026 - Mikelolpo - All Rights Reserved
        </small>
        <div className="flex items-center gap-6">
          <a className="cursor-pointer">
            <img src={facebook} alt="Facebook" width={30} height={30} />
          </a>
          <a className="cursor-pointer">
            <img src={twitter} alt="Twitter" width={30} height={30} />
          </a>
          <a className="cursor-pointer">
            <img src={instagram} alt="Instagram" width={30} height={30} />
          </a>
          <a className="cursor-pointer">
            <img src={youtube} alt="Youtube" width={30} height={30} />
          </a>
        </div>
      </div>
    </footer>
  )
}
