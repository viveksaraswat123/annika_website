import { motion } from "framer-motion";
import { ShieldCheck, Zap, Factory, Award, CheckCircle2, Cpu, Users2 } from "lucide-react";

const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function About() {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      {/* --- HERO SECTION: SPLIT DESIGN --- */}
      <section className="relative min-h-[70vh] flex items-center mb-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-cyan-700 text-[10px] font-bold uppercase tracking-widest">Since 2016</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              Reliability <br /> 
              <span className="text-cyan-500 italic">By Design.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Based in <span className="text-slate-900 font-bold">Haryana</span>, Annika Technologies is an Indiamart-verified manufacturer dedicated to the "Made in India" vision. We engineer the internal components that power modern industry.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="Precision Manufacturing" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Abstract Shape Overlay */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl -z-0 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID STATS --- */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="lg:col-span-2 bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">Our Commitment</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  With a dedicated team of over 20+ professionals, we bring years of specialized knowledge to the electronics sector. We don't just supply parts; we provide high-quality electronic assemblies that meet rigorous industrial standards for finish and durability.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <p className="text-4xl font-black text-cyan-500">2016</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Established</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-900">20+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experts</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-900">3000</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sq Ft Unit</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-cyan-500">100%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-slate-900 p-12 rounded-[2.5rem] text-white">
              <Award className="text-cyan-400 mb-6" size={48} />
              <h3 className="text-2xl font-bold mb-6 italic underline decoration-cyan-500 underline-offset-8">Core Pillars</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-cyan-400 mt-1" size={20} />
                  <span>Precision Surface Mount Assembly</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-cyan-400 mt-1" size={20} />
                  <span>Custom Wire Harness Looming</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-cyan-400 mt-1" size={20} />
                  <span>25,000+ Hr Indicator Lifespans</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL CAPABILITIES --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Inside the Lab</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900">Manufacturing Capabilities</h3>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          <Capability 
            icon={<Cpu size={32} />}
            title="PCB Assembly"
            desc="Expertise in single & double-sided assemblies using 35-micron copper and HASL surface finishing for maximum shelf life."
          />
          <Capability 
            icon={<Zap size={32} />}
            title="Indicator Solutions"
            desc="Specialized in Neon and LED indicator lamps with a working temperature range up to 135 degrees and 210-240V AC/DC stability."
          />
          <Capability 
            icon={<Factory size={32} />}
            title="Sub-Assemblies"
            desc="Supplying critical sub-assemblies for larger electronic products, ensuring 20A current rating and industrial-grade PVC housing."
          />
        </div>
      </section>
    </div>
  );
}

function Capability({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-100 transition-all text-center"
    >
      <div className="w-16 h-16 bg-slate-50 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tighter uppercase">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}