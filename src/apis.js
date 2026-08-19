import axios from 'axios';

/**
 * Vite statically replaces 'import.meta.env.VITE_API_URL'
 * during the build process.
 */
const BASE_URL = import.meta.env.VITE_API_URL;

console.log("Connecting to Backend at:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 45000, // Render free-tier cold starts can take 30-60s
  headers: {
    "Content-Type": "application/json",
  },
});

/** Fire-and-forget ping to wake a sleeping Render free-tier instance early. */
export const warmBackend = () => {
  api.get("/api/products").catch(() => {});
};

// ── Response interceptor: unified error logging ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error?.response?.data?.detail ?? error.message ?? "Unknown error";
    console.error(`[API Error] ${error?.config?.url} →`, detail);
    return Promise.reject(new Error(detail));
  }
);

// ── Products ──────────────────────────────────────────────────────────────────

/** Fetch all products, optionally filtered by category */
export const getProducts = (category) => {
  const params = category ? { category } : {};
  return api.get("/api/products", { params }).then((res) => res.data);
};

/** Fetch a single product by ID */
export const getProduct = (id) =>
  api.get(`/api/products/${id}`).then((res) => res.data);

// ── Contact form ──────────────────────────────────────────────────────────────
/**
 * General contact enquiry
 * @param {{ user_name, user_email, company?, phone?, message }} data
 */
export const submitContact = (data) =>
  api.post("/api/contact", data).then((res) => res.data);

// ── Datasheet request (Product card modal) ────────────────────────────────────
/**
 * Request a product datasheet — triggers email to sales@annika-technologies.com
 * @param {{ user_name, user_email, company?, phone?, product_title, message? }} data
 */
export const requestDatasheet = (data) =>
  api.post("/api/datasheet", data).then((res) => res.data);

// ── Custom / OEM specs enquiry ────────────────────────────────────────────────
/**
 * Submit a custom specs / OEM enquiry — triggers email to sales@annika-technologies.com
 * @param {{ user_name, user_email, phone?, product_type, specs }} data
 */
export const submitCustomSpecs = (data) =>
  api.post("/api/custom-specs", data).then((res) => res.data);

export default api;