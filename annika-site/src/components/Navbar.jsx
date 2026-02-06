import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const isInternalPage = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  // The Fix: Always use dark text if the background is light.
  // We only use white text if we are on Home, NOT scrolled, and NOT open.
  // BUT: Since your Home background is currently light, we force dark text.
  const useWhiteText = false; // Set to true only if you add a dark hero image later

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-cyan-500 z-[110] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled || isInternalPage || open
            ? "bg-white/95 backdrop-blur-md py-3 shadow-xl border-b border-slate-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <Link to="/" className="group relative z-50">
            <div className="flex flex-col">
              <span
                className={`text-2xl font-black tracking-tighter leading-none transition-colors duration-300 ${
                  useWhiteText && !scrolled && !open ? "text-white" : "text-slate-900"
                }`}
              >
                ANNIKA <span className="text-cyan-500">TECH</span>
              </span>
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${
                  useWhiteText && !scrolled && !open ? "text-slate-200" : "text-slate-500"
                }`}>
                Technologies
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative group ${
                  location.pathname === link.path
                    ? "text-cyan-500"
                    : (useWhiteText && !scrolled)
                    ? "text-white/80 hover:text-white"
                    : "text-slate-600 hover:text-cyan-500"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            
            <Link
              to="/contact"
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                (useWhiteText && !scrolled)
                  ? "bg-white text-slate-900 hover:bg-cyan-500 hover:text-white"
                  : "bg-slate-900 text-white hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30"
              }`}
            >
              Get Quote <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-xl transition-colors relative z-50 ${
              (useWhiteText && !scrolled && !open)
                ? "bg-white/10 text-white backdrop-blur-md"
                : "bg-slate-100 text-slate-900"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-[40] md:hidden flex flex-col justify-center px-10"
            >
              <div className="space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-4xl font-black uppercase tracking-tighter flex items-center justify-between ${
                        location.pathname === link.path ? "text-cyan-500" : "text-slate-900"
                      }`}
                    >
                      {link.name}
                      <span className="text-cyan-500 text-sm font-bold tracking-widest italic opacity-40">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}