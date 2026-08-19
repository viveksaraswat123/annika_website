import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PackagePlus,
  CheckCircle,
  Upload,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import { getToken } from "../auth";

const API = import.meta.env.VITE_API_URL;

const CATEGORIES = [
  "PCB Assembly",
  "Wire Harness",
  "Electrical Accessories",
  "Power Cords",
  "Domestic & Industrial Indicators",
];

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  // HANDLE IMAGE
  const handleImageChange = (file) => {
    if (!file) return;

    // VALIDATE IMAGE TYPE
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    // VALIDATE SIZE
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be below 10MB.");
      return;
    }

    setError("");
    setImageFile(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  // HANDLE DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      handleImageChange(file);
    }
  };

  // REMOVE IMAGE
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.target;
    const token = getToken();

    try {
      let imageUrl = "";

      // UPLOAD IMAGE
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch(`${API}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadRes.json();

        imageUrl = uploadData.url;
      }

      // SAVE PRODUCT
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: form.title.value,
          category: form.category.value,
          short_desc: form.short_desc.value,
          desc: form.desc.value,
          image: imageUrl,
          in_stock: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      setSuccess(true);

      form.reset();

      removeImage();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1a]">
      <AdminSidebar />

      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl"
        >
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <PackagePlus size={18} className="text-cyan-400" />
              </div>

              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cyan-500">
                Product Management
              </p>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              Add New Product
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Add industrial products, electrical accessories, PCB assemblies,
              and wire harness items to your Annika catalog.
            </p>
          </div>

          {/* CARD */}
          <div className="relative bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* SUCCESS */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-[#111827]/95 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
                      <CheckCircle
                        size={32}
                        className="text-cyan-400"
                      />
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                      Product Added
                    </h2>

                    <p className="text-slate-400 text-sm mt-2">
                      Your product has been added successfully.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* ERROR */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <X size={16} />
                  {error}
                </div>
              )}

              {/* IMAGE */}
              <div className="space-y-2">
                <Label>Product Image</Label>

                {imagePreview ? (
                  <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-700 bg-white group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-4"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
                      >
                        <X size={18} className="text-white" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                      <p className="text-[11px] text-white truncate max-w-[220px]">
                        {imageFile?.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`relative h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer
                    ${
                      dragOver
                        ? "border-cyan-500 bg-cyan-500/5"
                        : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0])
                      }
                    />

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                      ${
                        dragOver
                          ? "bg-cyan-500/20"
                          : "bg-slate-700/40"
                      }`}
                    >
                      {dragOver ? (
                        <Upload
                          size={20}
                          className="text-cyan-400"
                        />
                      ) : (
                        <ImageIcon
                          size={20}
                          className="text-slate-500"
                        />
                      )}
                    </div>

                    <p className="text-sm font-medium text-slate-400">
                      {dragOver
                        ? "Drop image here"
                        : "Click or drag & drop"}
                    </p>

                    <p className="text-xs text-slate-600 mt-1">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* TITLE + CATEGORY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Product Title</Label>

                  <input
                    name="title"
                    required
                    placeholder="e.g. 2 Pin AC Power Cord"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>

                  <select
                    name="category"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SHORT DESCRIPTION */}
              <div className="space-y-2">
                <Label>Short Description</Label>

                <input
                  name="short_desc"
                  required
                  placeholder="Short product summary for cards..."
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              {/* FULL DESCRIPTION */}
              <div className="space-y-2">
                <Label>Full Description</Label>

                <textarea
                  name="desc"
                  rows={5}
                  required
                  placeholder="Describe specifications, use cases, applications..."
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <div className="border-t border-slate-800" />

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    document.querySelector("form").reset();
                    removeImage();
                    setError("");
                  }}
                  className="px-6 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-cyan-900/30"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving Product...
                    </>
                  ) : (
                    <>
                      <PackagePlus size={18} />
                      Save Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-xs text-slate-700 mt-5">
            Products are automatically marked as{" "}
            <span className="text-slate-500">In Stock</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-slate-500">
      {children}
    </label>
  );
}