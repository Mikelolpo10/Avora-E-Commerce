import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import brandName from '@/assets/brand-name.png'

const navItems = [
  { name: 'NEW ARRIVAL', path: '/new_arrival' },
  { name: 'WOMEN', path: '/department/women' },
  { name: 'MEN', path: '/department/men' },
  { name: 'KIDS', path: '/department/kids' },
  { name: 'ON SALE', path: '/on_sale' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cek saat pertama kali render
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${isScrolled ? 'bg-gray-50/90' : 'mt-8 bg-white'} py-4 fixed px-26 max-h-16 w-full flex items-center justify-between gap-8 text-black box-border z-20`}>
        {/* Left Section kasih ukuran ke gambar biar g berubah ukuran*/}
        <div className="w-[15%] flex">
          <Link
            to={'/'}
            className="flex"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <img src={brandName} alt="Polini" />
          </Link>
        </div>

        {/* Mid Section */}
        <nav className="px-16 flex flex-1 items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}`}
              className={({ isActive }) =>
                `h-full flex items-center transition-all duration-300 hover:text-primary hover:underline hover:underline-offset-8 ${isActive ? 'font-bold' : 'font-medium'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="w-[15%] flex items-center justify-end">
          <div>Cart</div>
          <div>Profile</div>
          <div>Search</div>
        </div>
      </header>
    </>
  )
}