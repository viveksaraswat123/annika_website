import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackagePlus, CheckCircle, Upload, Loader2, X, Image as ImageIcon } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { getToken } from "../auth";

const API = import.meta.env.VITE_API_URL;
const CATEGORIES = ["PCB Assembly", "Wire Harness", "Industrial Indicators"];

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageChange(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.target;
    const token = getToken();

    try {
      let imageUrl = "";

      // 1. Upload image to Cloudinary via backend
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch(`${API}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // 2. Save product to MongoDB via backend
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title.value,
          category: form.category.value,
          desc: form.desc.value,
          image: imageUrl,
          in_stock: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to save product");

      setSuccess(true);
      form.reset();
      removeImage();
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1a]">
      <AdminSidebar />

      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <PackagePlus size={16} className="text-cyan-400" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-500">
                Product Management
              </p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
              Add New Product
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the details below to list a new item in your catalog.
            </p>
          </div>

          {/* Card */}
          <div className="relative bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

            {/* Success Overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-[#111827]/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                      <CheckCircle size={32} className="text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-white">Product Added!</h2>
                      <p className="text-sm text-slate-400 mt-1">Your item has been saved to the catalog.</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 relative">

              {/* Error Banner */}
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <X size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={removeImage}
                        className="w-9 h-9 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center transition-all">
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
                      <p className="text-[10px] text-slate-300 truncate max-w-[200px]">{imageFile?.name}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`relative w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer
                      ${dragOver ? "border-cyan-500 bg-cyan-500/5" : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"}`}
                  >
                    <input type="file" accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${dragOver ? "bg-cyan-500/20" : "bg-slate-700/50"}`}>
                      {dragOver ? <Upload size={18} className="text-cyan-400" /> : <ImageIcon size={18} className="text-slate-500" />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-400">{dragOver ? "Drop to upload" : "Click or drag & drop"}</p>
                      <p className="text-xs text-slate-600 mt-0.5">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Product Title</Label>
                  <input name="title" required placeholder="e.g. PCB Card Assembly"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select name="category"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea name="desc" rows={4} required
                  placeholder="Describe the product, specifications, use cases..."
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none" />
              </div>

              <div className="border-t border-slate-800" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button"
                  onClick={() => { document.querySelector("form").reset(); removeImage(); setError(""); }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-700 text-sm font-medium text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all">
                  Clear Form
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-lg shadow-cyan-900/30">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Saving Product...</> : <><PackagePlus size={16} /> Save Product</>}
                </button>
              </div>

            </form>
          </div>

          <p className="text-center text-xs text-slate-700 mt-5">
            Product will be listed as <span className="text-slate-500">In Stock</span> by default.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
      {children}
    </label>
  );
}