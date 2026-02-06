import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import axios from "axios"; // Ensure you run 'npm install axios'

// Configuration for API
const API_BASE_URL = "http://localhost:8000/api"; // Update with your FastAPI URL

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Extract data from form
    const formData = {
      user_name: formRef.current.user_name.value,
      user_email: formRef.current.user_email.value,
      message: formRef.current.message.value,
    };

    try {
      // API call to FastAPI
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);

      if (response.status === 200 || response.status === 201) {
        setIsSent(true);
        formRef.current.reset();
        // Hide success message after 5 seconds
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError("Unable to reach the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Information Side (Detailed from PDF) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-cyan-600 font-black uppercase tracking-widest text-sm mb-4">Connect With Us</h2>
              <h1 className="text-5xl font-black text-slate-900 mb-6">Let's Discuss Your <br/><span className="text-cyan-500">Requirements.</span></h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Our manufacturing unit in <span className="text-slate-900 font-bold">Kalka</span> is ready to handle your custom electronic sub-assembly needs with zero-defect quality assurance.
              </p>
            </div>

            <div className="space-y-8">
              <ContactInfo 
                icon={<MapPin />} 
                title="Our Location" 
                detail="Tagra Kangan, Opposite Gespee Pharmaceuticals, Kalka, Dist. Panchkula, Haryana, India - 133302" 
              />
              <ContactInfo 
                icon={<Phone />} 
                title="Call Us" 
                detail="+91 80599 44659 / +91 81682 92740" 
              />
              <ContactInfo 
                icon={<Mail />} 
                title="Email Inquiry" 
                detail="annikatechnologies@gmail.com" 
              />
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tax Registration</p>
              <p className="text-slate-900 font-bold">GSTIN: 06DVKPS2712B1ZS</p>
            </div>
          </motion.div>

          {/* Form Side with API Feedback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden"
          >
            {isSent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
              >
                <CheckCircle2 size={64} className="text-cyan-500 mb-4" />
                <h3 className="text-2xl font-black text-slate-900">Inquiry Dispatched</h3>
                <p className="text-slate-500 mt-2">Data successfully transmitted to our Haryana engineering hub.</p>
                <button onClick={() => setIsSent(false)} className="mt-6 text-cyan-600 font-bold text-sm hover:underline">Send another message</button>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input name="user_name" type="text" placeholder= "Your Name" required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-cyan-500 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input name="user_email" type="email" placeholder="yourname@example.com" required
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-cyan-500 transition-all outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                <textarea name="message" rows="5" placeholder="Describe your technical requirements (e.g., PCB Type, Wire Harness Specs)..." required
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-cyan-500 transition-all outline-none resize-none" />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-500 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Transmitting..." : "Send to Engineering Team"} <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, detail }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-cyan-500 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{title}</h4>
        <p className="text-slate-500 leading-relaxed text-sm font-medium">{detail}</p>
      </div>
    </div>
  );
}