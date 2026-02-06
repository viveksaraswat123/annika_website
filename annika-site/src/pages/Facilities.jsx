import { motion } from "framer-motion";
import { CheckCircle, Settings, ShieldCheck, Factory } from "lucide-react";

const facilityStats = [
  { label: "Production Area", value: "3000 sq. ft." },
  { label: "Skilled Workforce", value: "20+ Experts" },
  { label: "Established", value: "2016" },
  { label: "Location", value: "Haryana, India" }
];

const machineList = [
  { 
    name: "Wire Harness Processing Machine", 
    desc: "Automated cutting and stripping for high-precision harness manufacturing." 
  },
  { 
    name: "Sleeve Processing Machine", 
    desc: "Industrial-grade insulation application for electrical safety." 
  },
  { 
    name: "Electrical Tester Systems", 
    desc: "Multi-point testing to ensure zero-defect circuitry." 
  },
  { 
    name: "Conveyer Assembly Equipment", 
    desc: "Optimized workflow for high-volume electronic sub-assemblies." 
  }
];

export default function Facilities() {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Infrastructure</h2>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Built for <br /> <span className="text-cyan-500">Precision.</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-lg max-w-lg pb-2 leading-relaxed"
          >
            Our manufacturing unit in Kalka is equipped with state-of-the-art machinery 
            to ensure that every Made-in-India component meets international durability standards.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {facilityStats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <p className="text-cyan-500 font-black text-3xl mb-1">{stat.value}</p>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Machinery Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl font-black text-slate-900">Machine Inventory</h3>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {machineList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-cyan-200 hover:shadow-xl transition-all"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                  <Settings size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Commitment Section */}
        
        <motion.div 
          className="bg-slate-900 rounded-[3rem] p-10 lg:p-20 text-white relative overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-black mb-6">Our Quality Protocol</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                As per the Annika Technologies catalog, our dedicated QC department inspects 
                all items for design, quality, and finish before they leave our 3000 sq. ft. facility.
              </p>
              <ul className="space-y-4">
                {["Visual Inspection", "Electrical Performance Testing", "Durability Assessment"].map((check) => (
                  <li key={check} className="flex items-center gap-3 font-bold text-sm tracking-wide">
                    <ShieldCheck className="text-cyan-400" size={20} /> {check}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <p className="text-cyan-400 font-black text-xl mb-1">Indiamart Verified</p>
                <p className="text-slate-400 text-xs">Trusted Sole Owner Establishment</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <p className="text-cyan-400 font-black text-xl mb-1">Made in India</p>
                <p className="text-slate-400 text-xs">Supporting Local Manufacturing</p>
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </motion.div>

      </div>
    </div>
  );
}