import { api } from "./api";

/* ---------------------- Sliders Services ---------------------- */

// Get all sliders (مع pagination لو موجود)
export const getSliders = (page = 1) =>
  api.get(`/v1/admin/sliders?page=${page}`);

// Get one slider by ID
export const getSlider = (id: number) =>
  api.get(`/v1/admin/sliders/${id}`);

// Add new slider
export const addSlider = (payload: { title: string; desc: string; image?: File | null }) => {
  const fd = new FormData();
  fd.append("title", payload.title);
  fd.append("desc", payload.desc);
  if (payload.image) fd.append("image", payload.image);

  return api.post(`/v1/admin/sliders`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Update slider
export const updateSlider = (id: number, payload: { title: string; desc: string; image?: File | null }) => {
  const fd = new FormData();
  fd.append("_method", "PUT");
  fd.append("title", payload.title);
  fd.append("desc", payload.desc);
  if (payload.image) fd.append("image", payload.image);

  return api.post(`/v1/admin/sliders/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete slider
export const deleteSlider = (id: number) =>
  api.delete(`/v1/admin/sliders/${id}`);
