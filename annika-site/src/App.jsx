import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

//Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";

//Admin Pages
import AdminLogin from "./pages/AdminLogin"; 
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES (With Navbar/Footer) --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="contact" element={<Contact />} />
         
        </Route>

        {/* --- ADMIN AUTH --- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- PROTECTED ADMIN ROUTES (No Public Layout) --- */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-product" 
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;