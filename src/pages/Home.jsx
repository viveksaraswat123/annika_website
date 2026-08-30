import { motion } from "framer-motion";
import { ArrowRight, Cpu, Settings, ShieldCheck, Truck, Factory, Award, Globe, Building2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_FEATURES = [
  { icon: <Cpu size={22} />, label: "Wide Range of Components" },
  { icon: <Settings size={22} />, label: "Advanced Manufacturing" },
  { icon: <ShieldCheck size={22} />, label: "Quality Assurance" },
  { icon: <Truck size={22} />, label: "On-Time Delivery" },
];

const CLIENTS = [
  "Nipa International", "JSK International", "JSK Electricals", "V-Guard",
  "Schneider (OEM)", "Kaynes", "Morepen", "Transasia Group",
  "Travitron Group", "Atalanta Power Systems", "SARK India",
];

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
      <section className="relative bg-slate-950 pt-40 pb-20 overflow-hidden">

        {/* Background grid + glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/[0.06] -skew-x-12 translate-x-32 hidden lg:block z-0" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-left relative z-20"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6 break-words">
              COMPONENTS. <br />
              CONNECTIONS. <br />
              <span className="text-cyan-400">COMPLETE SOLUTIONS.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              Your trusted partner for high-quality PCB assemblies, wire harnesses, power cords and indicator switches, engineered and manufactured in Kalka, Haryana since 2016.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-xl">
              {HERO_FEATURES.map((f) => (
                <div key={f.label} className="text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-2">
                    {f.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wide leading-tight">{f.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
              <Link to="/products" className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 group">
                Explore Solutions <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <div className="relative z-10">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 w-full max-w-[480px] mx-auto" style={{ aspectRatio: "1 / 1" }}>
               <img
                src="images/p1.jpg"
                alt="PCB Card Assembly"
                className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* --- INDUSTRIAL PROWESS SECTION --- */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              { icon: <Factory />, title: "6000 Sq. Ft.", label: "Facility Size", desc: "Advanced unit in Kalka, Haryana." },
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

      {/* --- WHAT WE DO --- */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs mb-4">What We Do</p>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">Products. Manufacturing. Solutions.</h3>
            <div className="h-1 w-16 bg-cyan-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <WhatWeDoCard
              icon={<Cpu size={22} />}
              title="PCB Assembly"
              desc="High-precision PCB card assemblies built with strict quality control for industrial and OEM applications."
              img="images/p1.jpg"
              category="PCB Assembly"
            />
            <WhatWeDoCard
              icon={<Zap size={22} />}
              title="Wire Harness"
              desc="Custom wire harness looming engineered for reliability, durability and industrial performance."
              img="images/p2.jpg"
              category="Wire Harness"
            />
            <WhatWeDoCard
              icon={<Settings size={22} />}
              title="Electrical Accessories"
              desc="Power cords, switch connectors, and wiring accessories for electrical and electronic systems."
              img="images/wire-harness.png"
              category="Electrical Accessories"
            />
            <WhatWeDoCard
              icon={<ShieldCheck size={22} />}
              title="Domestic & Industrial Indicators"
              desc="Neon and LED indicator lamps and switch indicators for panel and equipment signaling."
              img="images/p3.webp"
              category="Domestic & Industrial Indicators"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[2px] w-12 bg-cyan-500" />
                <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em]">Trusted By</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                Selected Client Relationships
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Organisations across OEM manufacturing, electrical distribution and industrial
              equipment that rely on Annika Technologies for engineered components.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CLIENTS.map((client, i) => (
              <motion.div
                key={client}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group bg-white/5 border border-white/10 rounded-2xl px-6 py-7 flex items-center gap-4 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Building2 size={18} strokeWidth={1.75} />
                </div>
                <span className="text-white font-bold text-sm leading-snug tracking-tight">
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatWeDoCard({ icon, title, desc, img, category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-[1.75rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative h-44 bg-slate-50 shrink-0">
        <div className="w-full h-full overflow-hidden rounded-t-[1.75rem]">
          <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-lg">
          {icon}
        </div>
      </div>
      <div className="p-6 pt-10 flex flex-col flex-1">
        <h4 className="text-base font-black text-slate-900 mb-2 leading-snug">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
        <Link
          to={category ? `/products?category=${encodeURIComponent(category)}` : "/products"}
          className="text-cyan-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all mt-auto"
        >
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}