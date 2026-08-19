import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-6 pt-32 pb-20">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <Compass size={28} strokeWidth={1.5} />
        </div>
        <p className="text-cyan-600 font-black text-xs uppercase tracking-[0.3em] mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-cyan-500 transition-all shadow-xl shadow-slate-200 hover:shadow-cyan-200 group"
        >
          Back to Home <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
