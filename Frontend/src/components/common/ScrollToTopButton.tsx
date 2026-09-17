import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react"

export default function ScrollToTop() {
  const [show, setShow] = useState(false)
  const lastScrollY = useRef(0);
  const autoHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShow(true);

        if (autoHideRef.current) {
          clearTimeout(autoHideRef.current);
        }

        autoHideRef.current = setTimeout(() => {
          setShow(false);
        }, 4000);
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (autoHideRef.current) {
        clearTimeout(autoHideRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ translateY: "200%" }}
          animate={{ translateY: "0%" }}
          exit={{ translateY: "200%" }}
          transition={{ duration: 0.6 }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white z-10"
        >
          <ArrowUp strokeWidth={1.5} size={26} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}