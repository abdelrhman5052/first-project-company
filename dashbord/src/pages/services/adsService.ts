import { api } from "./api";

/* ---------------------- Ads Services ---------------------- */
export const getAds = (page = 1) =>
  api.get(`/v1/admin/ads?page=${page}`);

export const getAd = (id: number) =>
  api.get(`/v1/admin/ads/${id}`);

export const addAd = (payload: { title: string; desc: string; image?: File | null }) => {
  const fd = new FormData();
  fd.append("title", payload.title);
  fd.append("desc", payload.desc);
  if (payload.image) fd.append("image", payload.image);

  return api.post(`/v1/admin/ads`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateAd = (id: number, payload: any) => {
  const fd = new FormData();
  fd.append("_method", "PUT");
  fd.append("title", payload.title);
  fd.append("desc", payload.desc);
  if (payload.image) fd.append("image", payload.image);

  return api.post(`/v1/admin/ads/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteAd = (id: number) =>
  api.delete(`/v1/admin/ads/${id}`);
