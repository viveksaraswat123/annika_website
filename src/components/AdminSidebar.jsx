import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminLogout } from "../auth";

const NAV_LINKS = [
  { to: "/admin", icon: LayoutDashboard, label: "Inquiries" },
  { to: "/admin/add-product", icon: PackagePlus, label: "Add Product" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      adminLogout();
      navigate("/admin-login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-[#0d1424] border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <ShieldCheck size={14} className="text-cyan-400" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">Annika Admin</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu">
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside key="sidebar-mobile" initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 w-64 h-screen flex flex-col bg-[#0d1424] border-r border-slate-800 md:hidden">
            <SidebarContent isActive={isActive} handleLogout={handleLogout} onClose={() => setIsOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col w-60 shrink-0 sticky top-0 h-screen bg-[#0d1424] border-r border-slate-800">
        <SidebarContent isActive={isActive} handleLogout={handleLogout} />
      </aside>
    </>
  );
}

function SidebarContent({ isActive, handleLogout, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <ShieldCheck size={16} className="text-cyan-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight leading-none">Annika</p>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 px-3 mb-3">Navigation</p>
        {NAV_LINKS.map(({ to, icon: Icon, label }) => {
          const active = isActive(to);
          return (
            <Link key={to} to={to} onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${active ? "bg-cyan-500/10 text-cyan-400" : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/60"}`}>
              {active && (
                <motion.div layoutId="active-pill"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-500 rounded-full" />
              )}
              <Icon size={17} className={active ? "text-cyan-400" : "text-slate-600 group-hover:text-slate-300 transition-colors"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5 shrink-0 space-y-1 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/40 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
            <UserCircle size={18} className="text-slate-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 truncate">admin@annika.com</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all group">
          <LogOut size={17} className="group-hover:text-red-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}