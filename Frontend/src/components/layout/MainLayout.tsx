import { motion } from "motion/react";
import { Outlet } from "react-router"
import NavBar from "./NavBar"
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <div className="flex flex-col">
        <div className="px-24 h-8 w-full flex bg-primary overflow-x-hidden">
          <motion.div
            className="flex w-full items-center justify-end text-white text-sm font-medium"
            initial={{ translateX: "50%" }}
            animate={{ translateX: "-110%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            Free Shipping for Domestic Orders over Rp500k
          </motion.div>
        </div>

        <NavBar />

        <Outlet />

        <Footer />
      </div>
    </>
  )
}