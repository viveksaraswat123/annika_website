import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const isInternalPage = location.pathname !== "/";

  // Handle Scroll logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or screen resize
  useEffect(() => {
    setOpen(false);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "unset"; // Ensure scrolling is restored
    }
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-cyan-500 z-[120] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
          scrolled || isInternalPage || open
            ? "bg-white/90 backdrop-blur-xl py-3 shadow-lg border-b border-slate-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="relative z-[110]">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-slate-900">
                ANNIKA <span className="text-cyan-500">TECH</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500">
                Technologies
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  location.pathname === link.path ? "text-cyan-500" : "text-slate-600 hover:text-cyan-500"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
            
            <Link
              to="/contact"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
            >
              Get Quote <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="md:hidden relative z-[110] p-2 bg-slate-100 text-slate-900 rounded-xl active:scale-95 transition-transform"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-white z-[105] md:hidden flex flex-col pt-32 px-8 overflow-hidden"
            >
              {/* Decorative Background Element */}
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Navigation</p>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-4xl font-black uppercase tracking-tighter flex items-center justify-between group py-2 ${
                        location.pathname === link.path ? "text-cyan-500" : "text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ChevronRight className={`transition-transform duration-300 ${location.pathname === link.path ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Bottom Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto mb-12 relative z-10"
              >
                <Link
                  to="/contact"
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20"
                >
                  Request Technical Quote <ArrowUpRight size={18} />
                </Link>
                <div className="mt-8 flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest">© 2026 Annika Tech</span>
                  <div className="h-[1px] w-12 bg-slate-200" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}