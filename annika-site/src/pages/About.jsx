// import { motion } from "framer-motion";
// import {
//   Zap,
//   Factory,
//   Award,
//   CheckCircle2,
//   Cpu,
//   Settings,
//   ArrowRight,
//   Shield,
//   TrendingUp,
// } from "lucide-react";

// const fadeInUp = {
//   initial: { y: 30, opacity: 0 },
//   whileInView: { y: 0, opacity: 1 },
//   viewport: { once: true, margin: "-40px" },
//   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
// };

// const stagger = {
//   initial: {},
//   whileInView: { transition: { staggerChildren: 0.1 } },
//   viewport: { once: true },
// };

// const machines = [
//   {
//     image: "/images/manufacturing/facility.jpeg",
//     title: "Production Floor",
//     description:
//       "Modern 3,000 sq ft facility supporting cable assembly, molding and industrial production at scale.",
//   },
//   {
//     image: "/images/manufacturing/machine-2.jpeg",
//     title: "Injection Molding Machine",
//     description:
//       "Precision plastic molding equipment for manufacturing high-quality electrical and electronic components.",
//   },
//   {
//     image: "/images/manufacturing/machine-3.jpeg",
//     title: "Hydraulic Press Unit",
//     description:
//       "Industrial hydraulic press for molding, shaping and assembly operations with consistent output.",
//   },
//   {
//     image: "/images/manufacturing/machine-4.jpeg",
//     title: "Terminal Crimping Machine",
//     description:
//       "Secure and reliable electrical terminal crimping with high consistency across production runs.",
//   },
//   {
//     image: "/images/manufacturing/machine-5.jpeg",
//     title: "Wire Cutting Machine",
//     description:
//       "Automated wire cutting and stripping equipment for precise, repeatable cable preparation.",
//   },
//   {
//     image: "/images/manufacturing/machine-6.jpeg",
//     title: "Wire Processing Equipment",
//     description:
//       "Advanced wire preparation and harness manufacturing equipment for complex assemblies.",
//   },
//   {
//     image: "/images/manufacturing/machine-7.jpeg",
//     title: "Automatic Wire Crimping",
//     description:
//       "High-speed automated wire crimping system enabling large-scale, defect-free production.",
//   },
// ];

// const stats = [
//   { val: "2016", label: "Established" },
//   { val: "20+", label: "Expert Team" },
//   { val: "3,000", label: "Sq Ft Facility" },
//   { val: "100%", label: "Verified" },
// ];

// const pillars = [
//   "Precision Surface Mount Assembly",
//   "Custom Wire Harness Looming",
//   "25,000+ Hr Indicator Lifespans",
//   "Indiamart-Verified Manufacturer",
// ];

// const capabilities = [
//   {
//     icon: <Cpu size={24} />,
//     title: "PCB Assembly",
//     desc: "Single and double-sided PCB assemblies using high-quality copper tracks, built to rigorous industrial standards.",
//   },
//   {
//     icon: <Zap size={24} />,
//     title: "Indicators",
//     desc: "Neon and LED indicator manufacturing with 25,000+ hour operating life and exceptional stability.",
//   },
//   {
//     icon: <Factory size={24} />,
//     title: "Sub Assemblies",
//     desc: "Reliable electronic sub-assemblies engineered for demanding industrial and OEM applications.",
//   },
//   {
//     icon: <Shield size={24} />,
//     title: "Quality Control",
//     desc: "Rigorous in-process inspection and final QC at every stage to ensure zero-defect deliveries.",
//   },
//   {
//     icon: <TrendingUp size={24} />,
//     title: "Wire Harnesses",
//     desc: "Custom wire looming and harness assembly with precise routing, bundling and connector fitments.",
//   },
//   {
//     icon: <Award size={24} />,
//     title: "OEM Solutions",
//     desc: "End-to-end OEM manufacturing partnerships, from prototype to full-scale production runs.",
//   },
// ];

// export default function About() {
//   return (
//     <div
//       className="bg-white overflow-x-hidden"
//       style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
//     >
//       {/* ─── HERO ─── */}
//       <section className="relative pt-28 pb-0 min-h-screen flex flex-col justify-center">
//         {/* Background grid */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//           }}
//         />

//         <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 mb-8">
//               <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
//               <span className="text-cyan-700 text-[11px] font-bold uppercase tracking-[0.2em]">
//                 Established Since 2016
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
//               Reliability
//               <br />
//               <span className="text-cyan-500 italic">By Design.</span>
//             </h1>

//             <p className="text-slate-500 text-lg leading-relaxed max-w-lg mb-8">
//               Based in{" "}
//               <span className="text-slate-800 font-semibold">Haryana</span>,
//               Annika Technologies is an Indiamart-verified manufacturer
//               dedicated to the{" "}
//               <span className="text-slate-800 font-semibold">Made in India</span>{" "}
//               vision — delivering precision-engineered electronic assemblies to
//               industrial clients across India.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <a
//                 href="#capabilities"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-cyan-600 transition-colors duration-200"
//               >
//                 Our Capabilities <ArrowRight size={16} />
//               </a>
//               <a
//                 href="#facility"
//                 className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:border-cyan-400 hover:text-cyan-600 transition-colors duration-200"
//               >
//                 View Facility
//               </a>
//             </div>
//           </motion.div>

//           {/* Right — image + floating stat cards */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl aspect-[4/3]">
//               <img
//                 src="/images/manufacturing/facility.jpeg"
//                 alt="Annika Manufacturing Facility"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
//             </div>

//             {/* Floating cards */}
//             <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-4">
//               <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
//                 <Award size={20} className="text-cyan-600" />
//               </div>
//               <div>
//                 <p className="text-slate-900 font-black text-xl leading-none">100%</p>
//                 <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
//                   Indiamart Verified
//                 </p>
//               </div>
//             </div>

//             <div className="absolute -top-4 -right-6 bg-slate-900 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4">
//               <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
//                 <Factory size={20} className="text-cyan-400" />
//               </div>
//               <div>
//                 <p className="text-white font-black text-xl leading-none">3,000</p>
//                 <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
//                   Sq Ft Unit
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Stats bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="mt-20 border-t border-slate-100"
//         >
//           <div className="container mx-auto px-6 lg:px-12">
//             <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
//               {stats.map((s) => (
//                 <div key={s.label} className="py-8 text-center px-4">
//                   <p className="text-3xl lg:text-4xl font-black text-slate-900 mb-1">{s.val}</p>
//                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* ─── ABOUT SPLIT ─── */}
//       <section className="py-24 bg-slate-50">
//         <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
//           <motion.div {...fadeInUp}>
//             <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
//               Who We Are
//             </p>
//             <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
//               Our Commitment to{" "}
//               <span className="text-cyan-500">Industrial Excellence</span>
//             </h2>
//             <p className="text-slate-500 text-base leading-relaxed mb-6">
//               Since 2016, Annika Technologies has grown into a trusted name in
//               electronic assembly manufacturing. Operating from a modern 3,000
//               sq ft facility in Haryana, our team of 20+ skilled professionals
//               delivers precision-engineered components that power India's
//               industrial sector.
//             </p>
//             <p className="text-slate-500 text-base leading-relaxed">
//               From PCB assemblies to custom wire harnesses and industrial
//               indicators, every product leaves our facility having passed
//               rigorous quality checks — because our clients depend on parts
//               that simply cannot fail.
//             </p>
//           </motion.div>

//           <motion.div
//             {...fadeInUp}
//             className="bg-slate-900 rounded-[2rem] p-8 lg:p-10"
//           >
//             <Award className="text-cyan-400 mb-6" size={36} />
//             <h3 className="text-white text-2xl font-black mb-2">Core Pillars</h3>
//             <p className="text-slate-400 text-sm mb-8">
//               The foundations of every product we deliver.
//             </p>
//             <ul className="space-y-4">
//               {pillars.map((p) => (
//                 <li key={p} className="flex items-start gap-3">
//                   <CheckCircle2 className="text-cyan-400 shrink-0 mt-0.5" size={18} />
//                   <span className="text-slate-200 text-sm font-medium">{p}</span>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-10 pt-8 border-t border-slate-700/60 grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-cyan-400 font-black text-3xl">20+</p>
//                 <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
//                   Skilled Experts
//                 </p>
//               </div>
//               <div>
//                 <p className="text-cyan-400 font-black text-3xl">9 yrs</p>
//                 <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
//                   Industry Exp.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── MANUFACTURING FACILITY ─── */}
//       <section id="facility" className="py-24 bg-white">
//         <div className="container mx-auto px-6 lg:px-12">
//           <motion.div {...fadeInUp} className="max-w-2xl mb-16">
//             <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
//               Manufacturing Excellence
//             </p>
//             <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
//               Production Infrastructure
//             </h2>
//             <p className="text-slate-500 text-base leading-relaxed">
//               Our facility is equipped with modern machinery for cable
//               processing, wire harness assembly, injection molding, precision
//               crimping and full-scale industrial production.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={stagger}
//             initial="initial"
//             whileInView="whileInView"
//             viewport={{ once: true }}
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {machines.map((m, i) => (
//               <MachineCard key={i} {...m} />
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── CAPABILITIES ─── */}
//       <section id="capabilities" className="py-24 bg-slate-950">
//         <div className="container mx-auto px-6 lg:px-12">
//           <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
//             <p className="text-cyan-500 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
//               Inside The Lab
//             </p>
//             <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
//               What We Build
//             </h2>
//             <p className="text-slate-400 text-base leading-relaxed">
//               A full spectrum of precision manufacturing capabilities — from
//               surface mount PCB work to large-scale wire harness production.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={stagger}
//             initial="initial"
//             whileInView="whileInView"
//             viewport={{ once: true }}
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
//           >
//             {capabilities.map((c, i) => (
//               <CapabilityCard key={i} {...c} />
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── CTA ─── */}
//       <section className="py-24 bg-cyan-500">
//         <div className="container mx-auto px-6 lg:px-12 text-center">
//           <motion.div {...fadeInUp}>
//             <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
//               Ready to Partner With Us?
//             </h2>
//             <p className="text-cyan-100 text-lg max-w-xl mx-auto mb-10">
//               Get in touch for a quote or to discuss your manufacturing
//               requirements. We respond within 24 hours.
//             </p>
//             <a
//               href="/contact"
//               className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors duration-200"
//             >
//               Get a Quote <ArrowRight size={16} />
//             </a>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ── Sub-components ── */

// function MachineCard({ image, title, description }) {
//   return (
//     <motion.div
//       variants={fadeInUp}
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.25 }}
//       className="group bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
//     >
//       <div className="relative bg-slate-50 overflow-hidden" style={{ height: 240 }}>
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
//       </div>

//       <div className="p-6">
//         <div className="flex items-center gap-2 mb-3">
//           <Settings size={14} className="text-cyan-500" />
//           <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-[0.18em]">
//             Manufacturing Equipment
//           </span>
//         </div>
//         <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{title}</h3>
//         <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
//       </div>
//     </motion.div>
//   );
// }

// function CapabilityCard({ icon, title, desc }) {
//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="group p-8 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-default"
//     >
//       <div className="w-12 h-12 bg-cyan-500/15 text-cyan-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-500/25 transition-colors duration-200">
//         {icon}
//       </div>
//       <h4 className="text-white font-black text-base mb-2 uppercase tracking-wide">{title}</h4>
//       <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import {
  Zap,
  Factory,
  Award,
  CheckCircle2,
  Cpu,
  Settings,
  ArrowRight,
  Shield,
  TrendingUp,
} from "lucide-react";

const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const machines = [
  {
    image: "/images/manufacturing/facility.jpeg",
    title: "Production Floor",
    description:
      "Modern 3,000 sq ft facility supporting cable assembly, molding and industrial production at scale.",
  },
  {
    image: "/images/manufacturing/machine-2.jpeg",
    title: "Injection Molding Machine",
    description:
      "Precision plastic molding equipment for manufacturing high-quality electrical and electronic components.",
  },
  {
    image: "/images/manufacturing/machine-3.jpeg",
    title: "Hydraulic Press Unit",
    description:
      "Industrial hydraulic press for molding, shaping and assembly operations with consistent output.",
  },
  {
    image: "/images/manufacturing/machine-4.jpeg",
    title: "Terminal Crimping Machine",
    description:
      "Secure and reliable electrical terminal crimping with high consistency across production runs.",
  },
  {
    image: "/images/manufacturing/machine-5.jpeg",
    title: "Wire Cutting Machine",
    description:
      "Automated wire cutting and stripping equipment for precise, repeatable cable preparation.",
  },
  {
    image: "/images/manufacturing/machine-6.jpeg",
    title: "Wire Processing Equipment",
    description:
      "Advanced wire preparation and harness manufacturing equipment for complex assemblies.",
  },
  {
    image: "/images/manufacturing/machine-7.jpeg",
    title: "Automatic Wire Crimping",
    description:
      "High-speed automated wire crimping system enabling large-scale, defect-free production.",
  },
];

const stats = [
  { val: "2016", label: "Established" },
  { val: "20+", label: "Expert Team" },
  { val: "3,000", label: "Sq Ft Facility" },
  { val: "100%", label: "Verified" },
];

const pillars = [
  "Precision Surface Mount Assembly",
  "Custom Wire Harness Looming",
  "25,000+ Hr Indicator Lifespans",
  "Indiamart-Verified Manufacturer",
];

const capabilities = [
  {
    icon: <Cpu size={24} />,
    title: "PCB Assembly",
    desc: "Single and double-sided PCB assemblies using high-quality copper tracks, built to rigorous industrial standards.",
  },
  {
    icon: <Zap size={24} />,
    title: "Indicators",
    desc: "Neon and LED indicator manufacturing with 25,000+ hour operating life and exceptional stability.",
  },
  {
    icon: <Factory size={24} />,
    title: "Sub Assemblies",
    desc: "Reliable electronic sub-assemblies engineered for demanding industrial and OEM applications.",
  },
  {
    icon: <Shield size={24} />,
    title: "Quality Control",
    desc: "Rigorous in-process inspection and final QC at every stage to ensure zero-defect deliveries.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Wire Harnesses",
    desc: "Custom wire looming and harness assembly with precise routing, bundling and connector fitments.",
  },
  {
    icon: <Award size={24} />,
    title: "OEM Solutions",
    desc: "End-to-end OEM manufacturing partnerships, from prototype to full-scale production runs.",
  },
];

export default function About() {
  return (
    <div
      className="bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-0 min-h-screen flex flex-col justify-center">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-cyan-700 text-[11px] font-bold uppercase tracking-[0.2em]">
                Established Since 2016
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Reliability
              <br />
              <span className="text-cyan-500 italic">By Design.</span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-lg mb-8">
              Based in{" "}
              <span className="text-slate-800 font-semibold">Haryana</span>,
              Annika Technologies is an Indiamart-verified manufacturer
              dedicated to the{" "}
              <span className="text-slate-800 font-semibold">Made in India</span>{" "}
              vision — delivering precision-engineered electronic assemblies to
              industrial clients across India.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-cyan-600 transition-colors duration-200"
              >
                Our Capabilities <ArrowRight size={16} />
              </a>
              <a
                href="#facility"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:border-cyan-400 hover:text-cyan-600 transition-colors duration-200"
              >
                View Facility
              </a>
            </div>
          </motion.div>

          {/* Right — image + floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl aspect-[4/3]">
              <img
                src="/images/manufacturing/facility.jpeg"
                alt="Annika Manufacturing Facility"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Award size={20} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-xl leading-none">100%</p>
                <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                  Indiamart Verified
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-6 bg-slate-900 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Factory size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-black text-xl leading-none">3,000</p>
                <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mt-0.5">
                  Sq Ft Unit
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 border-t border-slate-100"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
              {stats.map((s) => (
                <div key={s.label} className="py-8 text-center px-4">
                  <p className="text-3xl lg:text-4xl font-black text-slate-900 mb-1">{s.val}</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── ABOUT SPLIT ─── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
              Who We Are
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Our Commitment to{" "}
              <span className="text-cyan-500">Industrial Excellence</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-6">
              Since 2016, Annika Technologies has grown into a trusted name in
              electronic assembly manufacturing. Operating from a modern 3,000
              sq ft facility in Haryana, our team of 20+ skilled professionals
              delivers precision-engineered components that power India's
              industrial sector.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              From PCB assemblies to custom wire harnesses and industrial
              indicators, every product leaves our facility having passed
              rigorous quality checks — because our clients depend on parts
              that simply cannot fail.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="bg-slate-900 rounded-[2rem] p-8 lg:p-10"
          >
            <Award className="text-cyan-400 mb-6" size={36} />
            <h3 className="text-white text-2xl font-black mb-2">Core Pillars</h3>
            <p className="text-slate-400 text-sm mb-8">
              The foundations of every product we deliver.
            </p>
            <ul className="space-y-4">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="text-cyan-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-200 text-sm font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-slate-700/60 grid grid-cols-2 gap-6">
              <div>
                <p className="text-cyan-400 font-black text-3xl">20+</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
                  Skilled Experts
                </p>
              </div>
              <div>
                <p className="text-cyan-400 font-black text-3xl">9 yrs</p>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">
                  Industry Exp.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MANUFACTURING FACILITY ─── */}
      <section id="facility" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="max-w-2xl mb-16">
            <p className="text-cyan-600 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
              Manufacturing Excellence
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Production Infrastructure
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Our facility is equipped with modern machinery for cable
              processing, wire harness assembly, injection molding, precision
              crimping and full-scale industrial production.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {machines.map((m, i) => (
              <MachineCard key={i} {...m} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section id="capabilities" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-cyan-500 font-bold uppercase tracking-[0.25em] text-[11px] mb-4">
              Inside The Lab
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              What We Build
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              A full spectrum of precision manufacturing capabilities — from
              surface mount PCB work to large-scale wire harness production.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {capabilities.map((c, i) => (
              <CapabilityCard key={i} {...c} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-cyan-500">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Ready to Partner With Us?
            </h2>
            <p className="text-cyan-100 text-lg max-w-xl mx-auto mb-10">
              Get in touch for a quote or to discuss your manufacturing
              requirements. We respond within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors duration-200"
            >
              Get a Quote <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Sub-components ── */

function MachineCard({ image, title, description }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 220, background: "#0f172a" }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-3"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Settings size={14} className="text-cyan-500" />
          <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-[0.18em]">
            Manufacturing Equipment
          </span>
        </div>
        <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function CapabilityCard({ icon, title, desc }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group p-8 rounded-[1.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-default"
    >
      <div className="w-12 h-12 bg-cyan-500/15 text-cyan-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-500/25 transition-colors duration-200">
        {icon}
      </div>
      <h4 className="text-white font-black text-base mb-2 uppercase tracking-wide">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}