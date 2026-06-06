
import { motion } from "framer-motion";
import {
  Zap,
  Factory,
  Award,
  CheckCircle2,
  Cpu,
  Settings,
} from "lucide-react";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const machines = [
  {
    image: "/images/manufacturing/facility.jpeg",
    title: "Production Floor",
    description:
      "Modern manufacturing facility supporting cable assembly, molding and industrial production.",
  },
  {
    image: "/images/manufacturing/machine-1.jpeg",
    title: "Injection Molding Machine",
    description:
      "Precision plastic molding equipment used for manufacturing electrical and electronic components.",
  },
  {
    image: "/images/manufacturing/machine-2.jpeg",
    title: "Hydraulic Press Unit",
    description:
      "Industrial hydraulic press used for molding, shaping and assembly operations.",
  },
  {
    image: "/images/manufacturing/machine-3.jpeg",
    title: "Terminal Crimping Machine",
    description:
      "Provides secure and reliable electrical terminal crimping with high consistency.",
  },
  {
    image: "/images/manufacturing/machine-4.jpeg",
    title: "Wire Cutting Machine",
    description:
      "Automated wire cutting and stripping equipment for accurate cable preparation.",
  },
  {
    image: "/images/manufacturing/machine-5.jpeg",
    title: "Wire Processing Equipment",
    description:
      "Advanced wire preparation and harness manufacturing equipment.",
  },
  {
    image: "/images/manufacturing/machine-6.jpeg",
    title: "Automatic Wire Crimping Machine",
    description:
      "High-speed automated wire crimping system for large-scale production.",
  },
];

export default function About() {
  return (
    <div className="bg-white pt-20 pb-12 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center mb-12 lg:mb-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

              <span className="text-cyan-700 text-[10px] font-bold uppercase tracking-widest">
                Since 2016
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Reliability <br className="hidden sm:block" />
              <span className="text-cyan-500 italic">
                By Design.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Based in{" "}
              <span className="text-slate-900 font-bold">
                Haryana
              </span>
              , Annika Technologies is an Indiamart-verified
              manufacturer dedicated to the Made in India vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative hidden sm:block"
          >
            <div className="aspect-video bg-slate-100 rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-4 lg:border-[12px] border-white shadow-xl">
              <img
                src="/images/manufacturing/facility.jpeg"
                alt="Annika Manufacturing Facility"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 py-16 lg:py-24 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            <motion.div
              {...fadeInUp}
              className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-[2rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">
                Our Commitment
              </h3>

              <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-10">
                We provide high-quality electronic assemblies that
                meet rigorous industrial standards for finish,
                durability and long-term reliability.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatItem
                  val="2016"
                  label="Established"
                  color="text-cyan-500"
                />

                <StatItem
                  val="20+"
                  label="Experts"
                  color="text-slate-900"
                />

                <StatItem
                  val="3000"
                  label="Sq Ft Unit"
                  color="text-slate-900"
                />

                <StatItem
                  val="100%"
                  label="Verified"
                  color="text-cyan-500"
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-slate-900 p-8 lg:p-12 rounded-[2rem] text-white"
            >
              <Award
                className="text-cyan-400 mb-6"
                size={40}
              />

              <h3 className="text-xl font-bold mb-6 italic underline decoration-cyan-500 underline-offset-8">
                Core Pillars
              </h3>

              <ul className="space-y-4">
                <PillarItem text="Precision Surface Mount Assembly" />
                <PillarItem text="Custom Wire Harness Looming" />
                <PillarItem text="25,000+ Hr Indicator Lifespans" />
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING FACILITY */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6">

          <motion.div
            {...fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
              Manufacturing Excellence
            </h2>

            <h3 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
              Production Infrastructure
            </h3>

            <p className="max-w-3xl mx-auto text-slate-600">
              Our manufacturing facility is equipped with
              modern machinery for cable processing,
              wire harness assembly, molding,
              crimping and industrial production.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <FacilityCard
              image="/images/manufacturing/facility.jpeg"
              title="Production Floor"
            />

            <FacilityCard
              image="/images/manufacturing/machine-2.jpeg"
              title="Injection Molding Machine"
            />

            <FacilityCard
              image="/images/manufacturing/machine-3.jpeg"
              title="Hydraulic Press Unit"
            />

            <FacilityCard
              image="/images/manufacturing/machine-4.jpeg"
              title="Terminal Crimping Machine"
            />

            <FacilityCard
              image="/images/manufacturing/machine-5.jpeg"
              title="Wire Cutting Machine"
            />

            <FacilityCard
              image="/images/manufacturing/machine-6.jpeg"
              title="Wire Processing Equipment"
            />
             <FacilityCard
              image="/images/manufacturing/machine-7.jpeg"
              title="Automatic Wire Crimping Machine"
            />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center mb-12">

          <h2 className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
            Inside The Lab
          </h2>

          <h3 className="text-3xl lg:text-5xl font-black text-slate-900">
            Capabilities
          </h3>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

          <Capability
            icon={<Cpu size={28} />}
            title="PCB Assembly"
            desc="Expertise in single and double-sided PCB assemblies using high-quality copper tracks."
          />

          <Capability
            icon={<Zap size={28} />}
            title="Indicators"
            desc="Neon and LED indicator manufacturing with long operating life and high stability."
          />

          <Capability
            icon={<Factory size={28} />}
            title="Sub Assemblies"
            desc="Reliable electronic sub-assemblies for industrial and OEM applications."
          />
        </div>
      </section>
    </div>
  );
}

function StatItem({ val, label, color }) {
  return (
    <div className="text-center p-2">
      <p className={`text-2xl lg:text-4xl font-black ${color}`}>
        {val}
      </p>

      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

function PillarItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <CheckCircle2
        className="text-cyan-400 shrink-0"
        size={18}
      />
      <span>{text}</span>
    </li>
  );
}

function FacilityCard({
  image,
  title,
  description,
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="
        bg-white
        rounded-[28px]
        overflow-hidden
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="bg-slate-50 p-5">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-[320px]
            object-contain
            rounded-2xl
          "
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Settings
            size={18}
            className="text-cyan-600"
          />

          <span className="text-cyan-600 text-xs font-bold uppercase tracking-wider">
            Manufacturing Equipment
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-3">
          {title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
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

      <h4 className="text-lg font-black text-slate-900 mb-3 tracking-tight uppercase">
        {title}
      </h4>

      <p className="text-slate-500 text-xs leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
