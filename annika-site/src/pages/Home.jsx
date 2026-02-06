import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, Factory, Zap, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";

// Animation Variants
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function Home() {
  return (
    <div className="bg-white selection:bg-cyan-500 selection:text-white">
      {/* --- HERO SECTION --- */}
      {/* Increased pt-32 to ensure Navbar doesn't cover the Title */}
      <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden bg-slate-50">
        
        {/* Modern Geometric Background Elements - Kept at z-0 */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/[0.03] -skew-x-12 translate-x-32 hidden lg:block z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl z-0" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text Content - Forced to z-20 to stay on top */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-left relative z-20"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-cyan-600 font-bold tracking-widest uppercase text-[10px]">Indiamart Verified Sole Proprietor</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-6">
              ENGINEERING <br />
              <span className="text-cyan-500">PRECISION.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Based in <span className="text-slate-900 font-bold underline decoration-cyan-500/30">Haryana</span>, Annika Technologies is a leading manufacturer of high-grade 
              <span className="text-cyan-600"> PCB Card Assemblies</span>, 
              <span className="text-cyan-600"> Wire Harnesses</span>, and 
              <span className="text-cyan-600"> Industrial Indicators</span>. Founded in 2016, we deliver 
              Made-in-India excellence to the global stage.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
              <Link to="/products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-cyan-500 transition-all shadow-xl shadow-slate-200 hover:shadow-cyan-200 group">
                View Full Catalog <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Our Heritage
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
               <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" 
                alt="High Precision PCB" 
                className="w-full aspect-square object-cover"
               />
            </div>
            
            {/* Detailed Floating Specs Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl z-30 border border-slate-100 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg"><Zap size={20}/></div>
                <span className="font-black text-slate-900 text-sm">Tech Specs</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Life Span</span>
                  <span className="text-cyan-500">25,000 Hrs</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[90%]"></div>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">Standard rating for our high-grade Neon Indicator Lamps.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- INDUSTRIAL PROWESS SECTION --- */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              { icon: <Factory />, title: "3000 Sq. Ft.", label: "Facility Size", desc: "Advanced unit in Kalka, Haryana." },
              { icon: <ShieldCheck />, title: "QC Tested", label: "Zero Defect", desc: "Rigorous inspection for design & finish." },
              { icon: <Award />, title: "20+ Experts", label: "Professional Team", desc: "Years of specialized knowledge." },
              { icon: <Globe />, title: "Made In India", label: "Local Pride", desc: "Top-tier global component standards." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-all hover:bg-white hover:shadow-xl group"
              >
                <div className="text-cyan-500 mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <p className="text-cyan-600 font-bold uppercase text-[10px] tracking-widest mb-2">{feature.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATEGORY PREVIEW --- */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs mb-4">Core Competencies</h2>
              <h3 className="text-4xl md:text-5xl font-black">One-Stop Solution for <br/> Electronic Components</h3>
            </div>
            <Link to="/products" className="text-cyan-400 font-bold flex items-center gap-2 hover:underline">
              Browse All Products <ArrowRight size={18}/>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <CategoryCard 
              title="PCB Assemblies" 
              points={["Single & Double Sided", "35 Micron Copper", "HASL Surface Finish"]}
              img="src/assets/p1.webp"
            />
            <CategoryCard 
              title="Wire Harness" 
              points={["Custom 2-Pin PVC", "Pure Copper Core", "Industrial Durability"]}
              img="src/assets/p2.jpg"
            />
            <CategoryCard 
              title="Neon Indicators" 
              points={["25,000 Hrs Life", "210V - 240V AC/DC", "22.5 mm Diameter"]}
              img="src/assets/p3.webp"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ title, points, img }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative h-[450px] rounded-[3rem] overflow-hidden group border border-white/10"
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 flex flex-col justify-end">
        <h4 className="text-2xl font-black mb-4">{title}</h4>
        <ul className="space-y-2">
          {points.map((p, i) => (
            <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
              <div className="h-1 w-1 bg-cyan-500 rounded-full" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}