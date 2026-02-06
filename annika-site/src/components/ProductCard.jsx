import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ title, desc, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-cyan-100 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-cyan-50 transition-colors duration-300 -z-0" />

      <div className="relative z-10">
        {/* Icon Container */}
        <div className="w-14 h-14 bg-slate-900 text-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-slate-200">
          {icon}
        </div>

        {/* Text Content */}
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            {title}
          </h4>
          <ArrowUpRight 
            size={18} 
            className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
          />
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
          {desc}
        </p>

        {/* Technical Accent Line */}
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-12 bg-cyan-500 transition-all duration-500 group-hover:w-20"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-cyan-500 transition-colors">
            Precision Grade
          </span>
        </div>
      </div>
    </motion.div>
  );
}