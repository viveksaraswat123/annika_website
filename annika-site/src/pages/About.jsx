import { motion } from "framer-motion";
import { ShieldCheck, Zap, Factory, Award, CheckCircle2, Cpu } from "lucide-react";

// Optimized animation: Reduced distance (y: 20) and simpler easing for mobile performance
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-50px" }, // Trigger slightly before it enters to avoid lag
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function About() {
  return (
    <div className="bg-white pt-20 pb-12 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex items-center mb-12 lg:mb-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
              {/* Removed pulse animation to save mobile CPU cycles */}
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span className="text-cyan-700 text-[10px] font-bold uppercase tracking-widest">Since 2016</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Reliability <br className="hidden sm:block" /> 
              <span className="text-cyan-500 italic">By Design.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Based in <span className="text-slate-900 font-bold">Haryana</span>, Annika Technologies is an Indiamart-verified manufacturer dedicated to the "Made in India" vision.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative hidden sm:block" // Hide complex visual on low-end mobile if lag persists
          >
            <div className="aspect-video bg-slate-100 rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-4 lg:border-[12px] border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="Precision Manufacturing" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID STATS --- */}
      <section className="bg-slate-50 py-16 lg:py-24 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div {...fadeInUp} className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">Our Commitment</h3>
              <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-10">
                We provide high-quality electronic assemblies that meet rigorous industrial standards for finish and durability.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatItem val="2016" label="Established" color="text-cyan-500" />
                <StatItem val="20+" label="Experts" color="text-slate-900" />
                <StatItem val="3000" label="Sq Ft Unit" color="text-slate-900" />
                <StatItem val="100%" label="Verified" color="text-cyan-500" />
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-slate-900 p-8 lg:p-12 rounded-[2rem] text-white">
              <Award className="text-cyan-400 mb-6" size={40} />
              <h3 className="text-xl font-bold mb-6 italic underline decoration-cyan-500 underline-offset-8">Core Pillars</h3>
              <ul className="space-y-4">
                <PillarItem text="Precision Surface Mount Assembly" />
                <PillarItem text="Custom Wire Harness Looming" />
                <PillarItem text="25,000+ Hr Indicator Lifespans" />
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL CAPABILITIES --- */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Inside the Lab</h2>
          <h3 className="text-3xl lg:text-5xl font-black text-slate-900">Capabilities</h3>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Capability 
            icon={<Cpu size={28} />}
            title="PCB Assembly"
            desc="Expertise in single & double-sided assemblies using 35-micron copper."
          />
          <Capability 
            icon={<Zap size={28} />}
            title="Indicators"
            desc="Neon and LED lamps with stability up to 135°C."
          />
          <Capability 
            icon={<Factory size={28} />}
            title="Sub-Assemblies"
            desc="Critical sub-assemblies ensuring 20A current rating."
          />
        </div>
      </section>
    </div>
  );
}

// Sub-components to keep the main tree clean and faster to render
function StatItem({ val, label, color }) {
  return (
    <div className="text-center p-2">
      <p className={`text-2xl lg:text-4xl font-black ${color}`}>{val}</p>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function PillarItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <CheckCircle2 className="text-cyan-400 shrink-0" size={18} />
      <span>{text}</span>
    </li>
  );
}

function Capability({ icon, title, desc }) {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm text-center"
    >
      <div className="w-14 h-14 bg-slate-50 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-black text-slate-900 mb-3 tracking-tight uppercase">{title}</h4>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </motion.div>
  );
}