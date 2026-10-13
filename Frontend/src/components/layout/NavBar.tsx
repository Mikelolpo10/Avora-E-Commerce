import { NavLink, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import brandName from '@/assets/brand_name.webp'
import { Search, ShoppingCart, User } from "lucide-react";

const navItems = [
  { name: 'New Arrival', path: '/new_arrival' },
  { name: 'Women', path: '/department/women' },
  { name: 'Men', path: '/department/men' },
  { name: 'Kids', path: '/department/kids' },
  { name: 'On Sale', path: '/on_sale' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 0);
  const location = useLocation()

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${isScrolled ? 'mt-2' : 'mt-8'} py-4 fixed px-16 max-h-16 w-full flex items-center justify-between gap-8 text-black box-border z-20`}>
        <div className="w-[15%] flex">
          <Link
            to={'/'}
            className="flex"
            onClick={handleLogoClick}
          >
            <img
              src={brandName}
              alt="Polini"
              className="h-7 w-32"
            />
          </Link>
        </div>

        {/* Mid Section */}
        {/* Bikin animasi kecil underline saat hover */}
        <nav className="flex w-120 items-center justify-between rounded-full border border-gray/30 bg-white/15 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative px-3 py-1 text-sm font-medium transition-all duration-300 hover:text-primary
                  ${isActive
                  ? 'font-semibold text-darker after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-primary'
                  : 'text-dark'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="w-[15%] flex items-center justify-end gap-2">
          <div className="p-3 flex h-12 w-12 items-center justify-between rounded-full border border-gray/30 bg-white/15 shadow-lg shadow-black/5 backdrop-blur-xl cursor-pointer">
            <Search strokeWidth={2} width={24} color="#271f1c" />
          </div>
          <div className="p-3 flex h-12 w-20 items-center justify-between rounded-full border border-gray/30 bg-white/15 shadow-lg shadow-black/5 backdrop-blur-xl cursor-pointer">
            <ShoppingCart strokeWidth={2} width={24} color="#271f1c" /> (0)
          </div>
          <div className="p-2 flex h-12 w-12 items-center justify-between rounded-full border border-gray/30 bg-white/15 shadow-lg shadow-black/5 backdrop-blur-xl cursor-pointer">
            <User strokeWidth={2} width={36} color="#271f1c" />
          </div>
        </div>
      </header>
    </>
  )
}