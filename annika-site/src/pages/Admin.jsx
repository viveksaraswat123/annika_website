import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Mail, Phone, Calendar, User,
  LayoutDashboard, PlusCircle, CheckCircle, Clock,
  RefreshCw, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { getToken } from "../auth";

const API = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchInquiries = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/inquiries`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "replied" ? "unread" : "replied";
    // Optimistic update
    setInquiries((prev) =>
      prev.map((iq) => (iq.id === id ? { ...iq, status: nextStatus } : iq))
    );
    try {
      await fetch(`${API}/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {
      // Revert on failure
      setInquiries((prev) =>
        prev.map((iq) => (iq.id === id ? { ...iq, status: currentStatus } : iq))
      );
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    setInquiries((prev) => prev.filter((iq) => iq.id !== id));
    try {
      await fetch(`${API}/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    } catch {
      fetchInquiries(true); // re-fetch if delete failed
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0f1a] font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-10 text-slate-300 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-cyan-500 mb-1">
                <LayoutDashboard size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Center</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Inquiries</h1>
              <p className="text-slate-500 text-sm mt-1">{inquiries.length} total submissions</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => fetchInquiries(true)}
                disabled={refreshing}
                className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
                title="Refresh"
              >
                {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              </button>
              <Link to="/admin/add-product"
                className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
                <PlusCircle size={16} /> NEW PRODUCT
              </Link>
            </div>
          </header>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
              ⚠ {error} — <button onClick={() => fetchInquiries()} className="underline">Retry</button>
            </div>
          )}

          {/* Table */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin text-slate-600" size={32} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-800/30 text-[10px] uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                    <tr>
                      <th className="p-6 font-black">Client & Contact</th>
                      <th className="p-6 font-black">Message</th>
                      <th className="p-6 font-black">Type</th>
                      <th className="p-6 font-black">Received</th>
                      <th className="p-6 font-black text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    <AnimatePresence>
                      {inquiries.map((iq) => (
                        <motion.tr
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={iq.id}
                          className="group hover:bg-slate-800/20 transition-all duration-300"
                        >
                          {/* Client */}
                          <td className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-2.5 rounded-xl shrink-0 ${iq.status === "replied" ? "bg-slate-800 text-slate-500" : "bg-cyan-500/10 text-cyan-400"}`}>
                                <User size={18} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors truncate">
                                  {iq.user_name || "Unknown"}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 truncate">
                                  <Mail size={11} /> {iq.user_email}
                                </span>
                                {iq.phone && (
                                  <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                    <Phone size={11} /> {iq.phone}
                                  </span>
                                )}
                                {iq.company && (
                                  <span className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-500 uppercase w-fit">
                                    {iq.company}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Message */}
                          <td className="p-6 max-w-xs">
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 italic">
                              "{iq.message || iq.specs || "—"}"
                            </p>
                            {iq.product_title && (
                              <span className="mt-2 inline-block px-2 py-0.5 rounded-md bg-cyan-500/10 text-[10px] font-bold text-cyan-500 uppercase">
                                {iq.product_title}
                              </span>
                            )}
                          </td>

                          {/* Type */}
                          <td className="p-6">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                              ${iq.type === "contact" ? "bg-blue-500/10 text-blue-400" :
                                iq.type === "datasheet" ? "bg-purple-500/10 text-purple-400" :
                                "bg-orange-500/10 text-orange-400"}`}>
                              {iq.type?.replace("_", " ") || "contact"}
                            </span>
                          </td>

                          {/* Date + Status */}
                          <td className="p-6">
                            <div className="flex flex-col gap-2">
                              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                <Calendar size={11} /> {formatDate(iq.timestamp)}
                              </span>
                              <button
                                onClick={() => toggleStatus(iq.id, iq.status)}
                                className={`flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                  ${iq.status === "replied"
                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse"}`}
                              >
                                {iq.status === "replied" ? <CheckCircle size={10} /> : <Clock size={10} />}
                                {iq.status || "unread"}
                              </button>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => deleteInquiry(iq.id)}
                                className="p-2.5 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}

            {/* Empty State */}
            {!loading && inquiries.length === 0 && !error && (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <Mail size={28} />
                </div>
                <h3 className="text-white font-bold text-lg">No Inquiries Yet</h3>
                <p className="text-slate-500 text-sm mt-1">When clients contact you, they will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}