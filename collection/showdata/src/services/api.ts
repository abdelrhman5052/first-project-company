import axios from "axios";

const base = import.meta.env.VITE_API_BASE as string; // e.g. https://phonician.online/api/v1
const token = import.meta.env.VITE_API_TOKEN as string;

/**
 * نستخدم /api في البداية عشان يروح للـ proxy بتاع Vite
 * فبيتحول إلى https://phonician.online/... بدون CORS
 */
export const api = axios.create({
  baseURL: `/api${new URL(base).pathname}`, // /api + /api/v1 => /api/api/v1
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
