import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Mail, Phone, Calendar, User, 
  LayoutDashboard, PlusCircle, CheckCircle, Clock, ExternalLink 
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "contact_inquiries"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "replied" ? "unread" : "replied";
    await updateDoc(doc(db, "contact_inquiries", id), { status: nextStatus });
  };

  const deleteInquiry = async (id) => {
    if (window.confirm("Permanent delete? This cannot be undone.")) {
      await deleteDoc(doc(db, "contact_inquiries", id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30">
      <AdminSidebar />
      
      <main className="flex-1 p-4 md:p-10 text-slate-300 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-cyan-500 mb-1">
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Center</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">Inquiries</h1>
            </div>
            
            <Link to="/admin/add-product" 
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/20 active:scale-95">
              <PlusCircle size={18} /> NEW PRODUCT
            </Link>
          </header>

          {/* Table Container */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-slate-800/30 text-[10px] uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800">
                  <tr>
                    <th className="p-6 font-black">Client & Contact</th>
                    <th className="p-6 font-black">Message Content</th>
                    <th className="p-6 font-black">Received At</th>
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
                        {/* Client Info */}
                        <td className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${iq.status === 'replied' ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500/10 text-cyan-400'}`}>
                              <User size={20} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">
                                {iq.user_name || "Unknown Client"}
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 hover:text-slate-300 cursor-pointer">
                                <Mail size={12}/> {iq.user_email}
                              </span>
                              {iq.phone && (
                                <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                  <Phone size={12}/> {iq.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Message */}
                        <td className="p-6 max-w-xs">
                          <div className="relative">
                            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 italic">
                              "{iq.message}"
                            </p>
                            {iq.company && (
                              <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                                {iq.company}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Timestamp & Status */}
                        <td className="p-6">
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                              <Calendar size={12}/> {iq.timestamp?.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                            </span>
                            <button 
                              onClick={() => toggleStatus(iq.id, iq.status)}
                              className={`flex items-center w-fit gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                iq.status === 'replied' 
                                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'
                              }`}
                            >
                              {iq.status === 'replied' ? <CheckCircle size={10}/> : <Clock size={10}/>}
                              {iq.status || 'unread'}
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-3">
                            <button className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all">
                              <ExternalLink size={16} />
                            </button>
                            <button 
                              onClick={() => deleteInquiry(iq.id)} 
                              className="p-2.5 rounded-xl bg-slate-800 text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {!loading && inquiries.length === 0 && (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <Mail size={32} />
                </div>
                <h3 className="text-white font-bold text-lg">No Inquiries Yet</h3>
                <p className="text-slate-500 text-sm">When clients contact you, they will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}