import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Cpu, Cable, Lightbulb, ArrowRight, Settings2, X, CheckCircle, Loader2 } from "lucide-react";
import { requestDatasheet, submitCustomSpecs } from "../apis";

const API = import.meta.env.VITE_API_URL;

const categories = [
  "All",
  "PCB Assembly",
  "Wire Harness",
  "Electrical Accessories",
  "Industrial Indicators",
];

// ─── Hardcoded fallback products ──────────────────────────────────────────────
const STATIC_PRODUCTS = [
  {
    id: "static-1",
    category: "PCB Assembly",
    title: "PCB Card Assembly",
    desc: "High-precision single-sided assemblies with 35-micron copper and HASL finishing for extreme shelf life.",
    image: "images/p1.webp",
    specs: { "Voltage": "210V", "Finish": "HASL", "Copper": "35 Micron", "Origin": "India" },
    in_stock: true,
  },
  {
    id: "static-2",
    category: "Wire Harness",
    title: "Electronics Wire Harness",
    desc: "Customized PVC insulated copper wire harnesses engineered for heavy-duty industrial machinery.",
    image: "images/p2.jpg",
    specs: { "Pins": "2-12 Pin", "Material": "Pure Copper", "Jacket": "PVC", "Rating": "High Temp" },
    in_stock: true,
  },
  {
    id: "static-3",
    category: "Industrial Indicators",
    title: "Neon Indicator Lamps",
    desc: "Extended-life signaling modules designed to withstand up to 135°C in continuous industrial operation.",
    image: "images/p3.webp",
    specs: { "Life": "25,000 Hrs", "Current": "25 Amps", "Temp": "135°C", "Type": "Industrial" },
    in_stock: true,
  },
  {
    id: "static-4",
    category: "Industrial Indicators",
    title: "LED Neon Indicator",
    desc: "High-visibility control panel indicators featuring low-wattage consumption and universal mounting.",
    image: "images/led-4.jpg",
    specs: { "Voltage": "24V DC", "Mounting": "22.5 mm", "Body": "Plastic", "Wattage": "12-24V" },
    in_stock: true,
  },
  {
    id: "static-5",
    category: "PCB Assembly",
    title: "Electronic Sub Assembly",
    desc: "Integrated board builds for complex electronic products, rated for 20A current stability.",
    image: "images/p5.webp",
    specs: { "Current": "20A", "Stability": "High", "Usage": "OEM", "Package": "Packet" },
    in_stock: true,
  },
  {
  id: "static-6",
  category: "Electrical Accessories",
  title: "2 Pin AC Power Cord",
  short_desc: "Durable 2 pin AC power cord for electrical and PCB applications.",
  desc: "High-quality 2 Pin AC Power Cord suitable for LED drivers, adapters, PCB assemblies, industrial electronics, and electrical devices. Built with durable insulation and flexible copper wiring for reliable long-term performance.",
  image: "images/ac-cord-white.png",

  specs: {
    "Plug Type": "2 Pin",
    "Wire Type": "Twin Core",
    "Material": "Copper",
    "Color": "Black and White",
  },

  in_stock: true,
},
{
  id: "static-7",
  category: "Electrical Accessories",
  title: "Multi Wire Harness Assembly",

  short_desc:
    "Industrial multi-core wire harness assembly for PCB and electrical systems.",

  desc:
    "High-quality multi-wire harness assembly designed for PCB integration, industrial machinery, electrical control systems, and OEM applications. Built using durable insulated copper wires with reliable connector locking.",

  image: "images/wire-harness.png",

  specs: {
    "Connector Type": "Multi Pin",
    "Wire Material": "Copper",
    "Application": "Industrial Electronics",
    "Insulation": "PVC",
  },

  in_stock: true,
},

{
  id: "static-8",
  category: "Electrical Accessories",

  title: "Rocker Switch Connector",

  short_desc:
    "Heavy-duty rocker switch assembly with connector wiring.",

  desc:
    "Premium rocker switch connector assembly suitable for industrial control panels, power switching systems, electronic equipment, and electrical devices. Designed for stable connectivity and long operational life.",

  image: "images/rocker-switch.png",

  specs: {
    "Switch Type": "Rocker",
    "Connector": "2 Pin",
    "Material": "ABS Plastic",
    "Application": "Power Control",
  },

  in_stock: true,
},
// {
//   id: "static-6",
//   category: "Electrical Accessories",
//   title: "2 Pin AC Power Cord",
//   short_desc: "Durable 2 pin AC power cord for electrical and PCB applications.",
//   desc: "High-quality 2 Pin AC Power Cord suitable for LED drivers, adapters, PCB assemblies, industrial electronics, and electrical devices. Built with durable insulation and flexible copper wiring for reliable long-term performance.",
//   image: "images/ac-cord-black.png",

//   specs: {
//     "Plug Type": "2 Pin",
//     "Wire Type": "Twin Core",
//     "Material": "Copper",
//     "Color": "Black",
//   },

//   in_stock: true,
// },
];

function CategoryIcon({ category, size = 120 }) {
  if (category === "PCB Assembly") return <Cpu size={size} strokeWidth={1} />;
  if (category === "Wire Harness") return <Cable size={size} strokeWidth={1} />;
  return <Lightbulb size={size} strokeWidth={1} />;
}

// ─── Datasheet Request Modal ──────────────────────────────────────────────────
function DatasheetModal({ product, onClose }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setServerError("");
    try {
      await requestDatasheet({
        user_name: form.name,
        user_email: form.email,
        company: form.company || undefined,
        phone: form.phone || undefined,
        product_title: product.title,
        message: form.message || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pb-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl"
      >
        <div className="relative h-52 rounded-t-[2rem] overflow-hidden bg-slate-100 flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
          ) : null}
          <div className={`${product.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-slate-300`}>
            <CategoryIcon category={product.category} size={96} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 block mb-1">{product.category}</span>
            <h2 className="text-xl font-black text-white tracking-tighter">{product.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <p className="text-slate-500 text-sm leading-relaxed mb-5">{product.desc}</p>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Technical Specifications</p>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{key}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <CheckCircle className="text-cyan-500 mx-auto mb-3" size={48} />
              <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Request Sent!</h3>
              <p className="text-sm text-slate-500 mb-5">Our engineering team will send you the full datasheet within 24 hours.</p>
              <button onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-colors duration-300">
                Close
              </button>
            </motion.div>
          ) : (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Request Full Datasheet</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <input type="text" placeholder="Full Name *" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-cyan-400"}`} />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name}</p>}
                </div>
                <input type="text" placeholder="Company" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-400 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <input type="email" placeholder="Email *" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-cyan-400"}`} />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                </div>
                <input type="tel" placeholder="Phone" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-400 transition-colors" />
              </div>
              <textarea placeholder="Describe your quantity or customisation needs..." rows={3}
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-400 transition-colors resize-none mb-4" />
              {serverError && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">⚠ {serverError}</p>
              )}
              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : "Send Request →"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Custom Enquiry Modal ─────────────────────────────────────────────────────
function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "PCB Assembly", specs: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.specs.trim()) e.specs = "Please describe your requirements";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setServerError("");
    try {
      await submitCustomSpecs({
        user_name: form.name,
        user_email: form.email,
        phone: form.phone || undefined,
        product_type: form.type,
        specs: form.specs,
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pb-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-600 block mb-1">Engineering</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Custom Specs</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          We handle custom wire harness looming, PCB modifications, and full OEM assemblies. Share your requirements below.
        </p>
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
            <CheckCircle className="text-cyan-500 mx-auto mb-3" size={48} />
            <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-2">Enquiry Received!</h3>
            <p className="text-sm text-slate-500 mb-5">An engineer will reach out within 1 business day.</p>
            <button onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-colors duration-300">
              Close
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <div>
              <input type="text" placeholder="Full Name *" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-cyan-400"}`} />
              {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input type="email" placeholder="Email *" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-cyan-400"}`} />
                {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email}</p>}
              </div>
              <input type="tel" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-400 transition-colors" />
            </div>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-cyan-400 transition-colors bg-white">
              <option>PCB Assembly</option>
              <option>Wire Harness</option>
              <option>Industrial Indicators</option>
              <option>Other</option>
            </select>
            <div>
              <textarea placeholder="Describe voltage ratings, dimensions, quantities, certifications needed..."
                rows={4} value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${errors.specs ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-cyan-400"}`} />
              {errors.specs && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.specs}</p>}
            </div>
            {serverError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">⚠ {serverError}</p>
            )}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : "Submit Enquiry →"}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      key={item.id || item.title}
      className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:border-cyan-100 transition-all duration-500"
    >
      <div className="relative overflow-hidden rounded-[2rem] h-64 bg-white border border-slate-100">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
        {item.image ? (
          <img
  src={item.image}
  alt={item.title}
  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
    item.title === "2 Pin AC Power Cord" ||
    item.title === "Multi Wire Harness Assembly" ||
    item.title === "LED Neon Indicator" ||
    item.title === "Rocker Switch Connector"
      ? "object-contain bg-white p-6"
      : "object-cover"
  }`}
  onError={(e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  }}
/>
        ) : null}
        <div className={`${item.image ? "hidden" : "flex"} absolute inset-0 w-full h-full items-center justify-center text-slate-300`}>
          <CategoryIcon category={item.category} size={120} />
        </div>
      </div>
      <div className="p-6 pt-8">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 mb-2 block">{item.category}</span>
        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter">{item.title}</h3>
       <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium line-clamp-2">
          {item.short_desc || item.desc}
      </p>
        {item.specs && Object.keys(item.specs).length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6 mb-6 space-y-3 border border-slate-100">
            {Object.entries(item.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{key}</span>
                <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-slate-200">{val}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => onSelect(item)}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] group-hover:bg-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
          Request Full Datasheet
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Products() {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from MongoDB via API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
        }
      } catch (err) {
        console.error("Could not load products from API:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Merge: static first, then DB products (deduped by title)
  const staticTitles = new Set(STATIC_PRODUCTS.map((p) => p.title.toLowerCase()));
  const newDbProducts = dbProducts.filter((p) => !staticTitles.has(p.title?.toLowerCase()));
  const allProducts = [...STATIC_PRODUCTS, ...newDbProducts];

  const filteredItems = filter === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === filter);

  return (
    <div className="bg-white min-h-screen selection:bg-cyan-500 selection:text-white">

      <AnimatePresence>
        {selectedProduct && (
          <DatasheetModal key="datasheet" product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
        {showEnquiry && (
          <EnquiryModal key="enquiry" onClose={() => setShowEnquiry(false)} />
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="bg-slate-900 pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-cyan-500" />
            <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em]">Catalog 2026</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            ENGINEERED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">COMPONENTS.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
            From 35-micron PCB traces to 25,000-hour indicators, we build the hardware that powers India's industries.
          </motion.p>
        </div>
      </section>

      {/* LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">

        {/* SIDEBAR */}
        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Filter System</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`group flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all
                    ${filter === cat ? "bg-slate-900 text-cyan-400 shadow-xl" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>
                  {cat}
                  <ArrowRight size={14} className={`transition-all ${filter === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Showing </span>
            <span className="text-sm font-black text-slate-900">{filteredItems.length}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400"> / {allProducts.length} Products</span>
          </div>

          <div className="p-6 bg-cyan-50 rounded-3xl border border-cyan-100">
            <Settings2 className="text-cyan-600 mb-4" />
            <h4 className="font-bold text-slate-900 mb-2">Custom Specs?</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We provide custom wire harness looming and PCB modifications for OEM requirements.
            </p>
            <button onClick={() => setShowEnquiry(true)}
              className="text-[10px] font-black uppercase text-cyan-600 hover:text-cyan-700 transition-colors">
              Talk to Engineer →
            </button>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="lg:col-span-9">
          {loadingProducts && dbProducts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-slate-300" size={32} />
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.length === 0 ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="col-span-2 py-24 text-center">
                    <p className="text-slate-300 font-black uppercase tracking-widest text-lg">No products in this category</p>
                  </motion.div>
                ) : (
                  filteredItems.map((item) => (
                    <ProductCard key={item.id || item.title} item={item} onSelect={setSelectedProduct} />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}