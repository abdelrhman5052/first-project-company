import { api } from "./api";

/* ---------------------- Categories Services ---------------------- */

// Get all categories (مع pagination لو موجود)
export const getCategories = (page = 1) =>
  api.get(`/v1/admin/categories?page=${page}`);

// Get single category by ID
export const getCategory = (id: number) =>
  api.get(`/v1/admin/categories/${id}`);

// Add new category
export const addCategory = (payload: {
  category_name: string;
  category_status: string | number;
  parent?: string | number | null;
  icon?: File | null;
}) => {
  const fd = new FormData();
  fd.append("category_name", String(payload.category_name));
  fd.append("category_status", String(payload.category_status));
  if (payload.parent) fd.append("parent", String(payload.parent));
  if (payload.icon) fd.append("icon", payload.icon);

  return api.post(`/v1/admin/categories`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Update category
export const updateCategory = (id: number, payload: any) => {
  const fd = new FormData();
  fd.append("_method", "PUT");
  fd.append("category_name", String(payload.category_name));
  fd.append("category_status", String(payload.category_status));
  if (payload.parent) fd.append("parent", String(payload.parent));
  if (payload.icon) fd.append("icon", payload.icon);

  return api.post(`/v1/admin/categories/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete category
export const deleteCategory = (id: number) =>
  api.delete(`/v1/admin/categories/${id}`);

// Get parent categories
export const getParentCategories = () =>
  api.get(`/v1/categories/parents`);
