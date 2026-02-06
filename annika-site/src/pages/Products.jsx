import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cpu, Zap, Cable, Lightbulb, ArrowRight, Settings2 } from "lucide-react";

const categories = ["All", "PCB Assembly", "Wire Harness", "Indicators"];

const products = [
  {
    category: "PCB Assembly",
    title: "PCB Card Assembly",
    desc: "High-precision single-sided assemblies with 35-micron copper and HASL finishing for extreme shelf life.",
    image: "images/p1.webp", 
    specs: { "Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron", "Origin": "India" }
  },
  {
    category: "Wire Harness",
    title: "Electronics Wire Harness",
    desc: "Customized PVC insulated copper wire harnesses engineered for heavy-duty industrial machinery.",
    image: "images/p2.jpg",
    specs: { "Pins": "2-12 Pin", "Material": "Pure Copper", "Jacket": "PVC", "Rating": "High Temp" }
  },
  {
    category: "Indicators",
    title: "Neon Indicator Lamps",
    desc: "Extended-life signaling modules designed to withstand up to 135°C in continuous industrial operation.",
    image: "images/p3.webp",
    specs: { "Life": "25,000 Hrs", "Current": "25 Amps", "Temp": "135°C", "Type": "Industrial" }
  },
  {
    category: "Indicators",
    title: "LED Neon Indicator",
    desc: "High-visibility control panel indicators featuring low-wattage consumption and universal mounting.",
    image: "images/p4.webp",
    specs: { "Voltage": "24V DC", "Mounting": "22.5 mm", "Body": "Plastic", "Wattage": "12-24V" }
  },
  {
    category: "PCB Assembly",
    title: "Electronic Sub Assembly",
    desc: "Integrated board builds for complex electronic products, rated for 20A current stability.",
    image: "images/p5.webp",
    specs: { "Current": "20A", "Stability": "High", "Usage": "OEM", "Package": "Packet" }
  }
];

export default function Products() {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen selection:bg-cyan-500 selection:text-white">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="bg-slate-900 pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-cyan-500"></div>
            <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em]">Catalog 2026</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            ENGINEERED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">COMPONENTS.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
            From 35-micron PCB traces to 25,000-hour indicators, we build the hardware that powers India's industries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        {/* --- STICKY CATEGORY NAV --- */}
        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Filter System</h3>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`group flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all
                    ${filter === cat 
                      ? "bg-slate-900 text-cyan-400 shadow-xl" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                >
                  {cat}
                  <ArrowRight size={14} className={`${filter === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-all"}`} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-cyan-50 rounded-3xl border border-cyan-100">
            <Settings2 className="text-cyan-600 mb-4" />
            <h4 className="font-bold text-slate-900 mb-2">Custom Specs?</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">We provide custom wire harness looming and PCB modifications for OEM requirements.</p>
            <button className="text-[10px] font-black uppercase text-cyan-600 hover:text-cyan-700">Talk to Engineer →</button>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className="lg:col-span-9">
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.title}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:border-cyan-100 transition-all duration-500"
                >
                  <div className="relative overflow-hidden rounded-[2rem] h-72 bg-slate-100">
                     <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                     
                     {/* IMAGE HANDLING LOGIC */}
                     <img 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       onError={(e) => {
                         // If image fails to load, hide the image and show the icon
                         e.target.style.display = 'none';
                         e.target.nextSibling.style.display = 'flex';
                       }}
                     />

                     {/* FALLBACK ICON (Displayed if image is missing or errors) */}
                     <div className="hidden absolute inset-0 w-full h-full items-center justify-center text-slate-300">
                        {item.category === "PCB Assembly" ? <Cpu size={120} strokeWidth={1}/> : 
                         item.category === "Wire Harness" ? <Cable size={120} strokeWidth={1}/> : 
                         <Lightbulb size={120} strokeWidth={1}/>}
                     </div>
                  </div>

                  <div className="p-6 pt-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{item.desc}</p>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 mb-6 space-y-3 border border-slate-100">
                      {Object.entries(item.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{key}</span>
                          <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-slate-200">{val}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] group-hover:bg-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                      Request Full Datasheet
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}