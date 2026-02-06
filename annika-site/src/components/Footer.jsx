import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        
        {/* Company Branding */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-black tracking-tighter mb-6">
            ANNIKA<span className="text-cyan-500">.</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 mb-6">
            Pioneering electronic excellence since 2016. India's trusted 
            manufacturer for high-precision PCB assemblies and industrial indicator solutions.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
            <ShieldCheck size={14} className="text-cyan-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Indiamart Verified</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">Sitemap</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <Link to="/" className="hover:text-white flex items-center gap-2 group transition-colors">
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Home
            </Link>
            <Link to="/about" className="hover:text-white flex items-center gap-2 group transition-colors">
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> About Us
            </Link>
            <Link to="/products" className="hover:text-white flex items-center gap-2 group transition-colors">
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Product Catalog
            </Link>
            <Link to="/contact" className="hover:text-white flex items-center gap-2 group transition-colors">
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Contact
            </Link>
          </div>
        </div>

        {/* Manufacturing HQ Address */}
        <div className="md:col-span-1">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">Manufacturing HQ</h3>
          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex gap-3">
              <MapPin size={18} className="text-cyan-500 shrink-0" />
              <p>Tagra Kangan, Opposite Gespee Pharmaceuticals, Kalka, Dist. Panchkula, Haryana 133302</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-cyan-500 shrink-0" />
              <p>annikatechnologies@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Direct Connect */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">Quick Connect</h3>
          <div className="space-y-4">
            <a href="tel:+918059944659" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
              <Phone size={18} className="text-cyan-500" />
              <span className="text-sm font-bold">+91 80599 44659</span>
            </a>
            <a href="tel:+918168292740" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
              <Phone size={18} className="text-cyan-500" />
              <span className="text-sm font-bold">+91 81682 92740</span>
            </a>
            <div className="pt-4">
              <p className="text-[10px] text-slate-500 font-mono">GSTIN: 06DVKPS2712B1ZS</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Annika Technologies. Built for Industrial Excellence.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="hover:text-cyan-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-cyan-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}