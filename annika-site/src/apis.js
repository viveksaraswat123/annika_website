import axios from 'axios';

/** * Vite statically replaces 'import.meta.env.VITE_API_URL' 
 * during the build process.
 */
const BASE_URL = "https://annikawebsite-production.up.railway.app";

console.log("Connecting to Backend at:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;