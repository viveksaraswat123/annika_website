// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    const timer = setTimeout(() => setTimedOut(true), 5000); // 5s fallback
    return () => { unsub(); clearTimeout(timer); };
  }, []);

  if (user === undefined) {
    return timedOut ? (
      <Navigate to="/admin-login" replace />
    ) : (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">Verifying</span>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin-login" replace />;
}