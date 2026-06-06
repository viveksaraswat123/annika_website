import { motion } from "framer-motion";
import { CheckCircle, Settings, ShieldCheck, Factory, Zap, Cpu, Award } from "lucide-react";

const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const facilityStats = [
  { label: "Production Area", value: "3,000", unit: "sq. ft." },
  { label: "Skilled Workforce", value: "20+", unit: "Experts" },
  { label: "Established", value: "2016", unit: "Since" },
  { label: "Location", value: "Kalka", unit: "Haryana, India" },
];

const machines = [
  {
    image: "/images/manufacturing/facility.jpeg",
    name: "Production Floor",
    category: "Core Facility",
    desc: "A modern 3,000 sq ft production floor designed for efficient cable assembly, molding and electronic sub-assembly operations at scale.",
    specs: ["3,000 sq ft area", "20+ operators", "Multi-line layout"],
  },
  {
    image: "/images/manufacturing/machine-2.jpeg",
    name: "Injection Molding Machine",
    category: "Molding",
    desc: "Precision vertical injection molding equipment for high-quality plastic component manufacturing used in electrical and electronic products.",
    specs: ["Vertical configuration", "Plastic & rubber", "High repeatability"],
  },
  {
    image: "/images/manufacturing/machine-3.jpeg",
    name: "Hydraulic Press Unit",
    category: "Pressing",
    desc: "Industrial hydraulic press for molding, shaping and assembly operations delivering consistent force and dimensional accuracy.",
    specs: ["Consistent pressure", "Heavy-duty build", "Multi-purpose"],
  },
  {
    image: "/images/manufacturing/machine-4.jpeg",
    name: "Terminal Crimping Machine",
    category: "Crimping",
    desc: "Dedicated terminal crimping unit providing secure, reliable electrical connections with consistent crimp quality across all production runs.",
    specs: ["High crimp consistency", "Multiple terminal types", "Low rejection rate"],
  },
  {
    image: "/images/manufacturing/machine-5.jpeg",
    name: "Wire Cutting Machine",
    category: "Wire Processing",
    desc: "Automated wire cutting and stripping equipment enabling precise, repeatable cable preparation with programmable cut lengths.",
    specs: ["Programmable lengths", "Auto stripping", "High throughput"],
  },
  {
    image: "/images/manufacturing/machine-6.jpeg",
    name: "Wire Processing Equipment",
    category: "Wire Processing",
    desc: "Advanced wire preparation and harness manufacturing equipment handling complex multi-conductor assemblies with precision.",
    specs: ["Multi-conductor support", "Harness assembly", "Precision routing"],
  },
  {
    image: "/images/manufacturing/machine-7.jpeg",
    name: "Automatic Wire Crimping Machine",
    category: "Crimping",
    desc: "High-speed fully automated wire crimping system for large-scale production, ensuring zero-defect crimp joints at volume.",
    specs: ["Fully automated", "High-speed output", "Zero-defect target"],
  },
];

const qualityChecks = [
  "Visual Inspection of all components",
  "Electrical Performance Testing",
  "Durability & Stress Assessment",
  "Dimensional Accuracy Verification",
  "Final QC Sign-off before dispatch",
];

const certBadges = [
  {
    title: "Indiamart Verified",
    sub: "Trusted Sole Owner Establishment",
    icon: <Award size={20} className="text-cyan-400" />,
  },
  {
    title: "Made in India",
    sub: "Supporting Local Manufacturing",
    icon: <Factory size={20} className="text-cyan-400" />,
  },
  {
    title: "In-House QC",
    sub: "Dedicated Quality Department",
    icon: <ShieldCheck size={20} className="text-cyan-400" />,
  },
];

export default function Facilities() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="relative container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                Infrastructure
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Built for
              <br />
              <span className="text-cyan-500 italic">Precision.</span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              Our manufacturing unit in{" "}
              <span className="text-white font-semibold">Kalka, Haryana</span>{" "}
              is equipped with state-of-the-art machinery to ensure every
              Made-in-India component meets international durability standards.
            </p>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {facilityStats.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200"
              >
                <p className="text-cyan-400 font-black text-3xl leading-none mb-1">{s.value}</p>
                <p className="text-slate-300 text-sm font-semibold mb-1">{s.unit}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MACHINE INVENTORY ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="max-w-2xl mb-16">
            <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
              Machine Inventory
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Our Equipment
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Every machine in our facility is purpose-selected for the
              precision, throughput and reliability that industrial clients
              depend on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((m, i) => (
              <MachineCard key={i} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY PROTOCOL ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div {...fadeInUp}>
              <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
                Quality Assurance
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Our Quality <br />Protocol
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10">
                Our dedicated QC department inspects every item for design,
                quality and finish before it leaves the facility. No component
                ships without clearing every checkpoint.
              </p>
              <ul className="space-y-4">
                {qualityChecks.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <ShieldCheck className="text-cyan-500 shrink-0" size={18} />
                    <span className="text-slate-700 text-sm font-medium">{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeInUp} className="space-y-4">
              {certBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 bg-slate-900 rounded-2xl p-6 border border-slate-800"
                >
                  <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-white font-black text-lg">{b.title}</p>
                    <p className="text-slate-400 text-sm">{b.sub}</p>
                  </div>
                </div>
              ))}

              <div className="bg-cyan-500 rounded-2xl p-8 mt-2">
                <p className="text-white font-black text-2xl mb-2">Zero Compromise</p>
                <p className="text-cyan-100 text-sm leading-relaxed">
                  Every batch undergoes multi-stage inspection. Our rejection
                  rate is kept near zero through in-process quality gates at
                  each production stage.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CAPABILITIES OVERVIEW ── */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-cyan-500 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
              What We Produce
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Production Capabilities
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              End-to-end manufacturing from raw wire processing to finished,
              tested assemblies - all under one roof.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Cpu size={24} />,
                title: "PCB Assembly",
                desc: "Single and double-sided PCB assemblies with high-quality copper tracks built to rigorous industrial standards.",
              },
              {
                icon: <Zap size={24} />,
                title: "Indicators",
                desc: "Neon and LED indicator manufacturing with 25,000+ hour operating life and exceptional thermal stability.",
              },
              {
                icon: <Factory size={24} />,
                title: "Wire Harnesses",
                desc: "Custom wire looming and harness assemblies with precise routing, bundling and connector fitments.",
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="group p-8 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan-500/15 text-cyan-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-500/25 transition-colors duration-200">
                  {c.icon}
                </div>
                <h4 className="text-white font-black text-base mb-2 uppercase tracking-wide">{c.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function MachineCard({ image, name, category, desc, specs, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 220, background: "#0f172a" }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-cyan-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Settings size={13} className="text-cyan-500" />
          <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-[0.18em]">
            Manufacturing Equipment
          </span>
        </div>
        <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>

        {/* Specs pills */}
        <div className="flex flex-wrap gap-2">
          {specs.map((s) => (
            <span
              key={s}
              className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}