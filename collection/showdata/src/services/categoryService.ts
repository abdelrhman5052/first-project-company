import { api } from "./api";
import type { PaginatedResponse, Category } from "../types/category";

// LIST (مع صفحة)
export const getCategories = (page = 1) =>
  api.get<PaginatedResponse<Category>>(`/admin/categories?page=${page}`);

// SHOW
export const getCategory = (id: number) =>
  api.get<{ status: number; msg: string; data: Category }>(`/admin/categories/${id}`);

// ADD
export const addCategory = (payload: { name: string; status: string | number; parent?: string | number | null; icon?: File | null; }) => {
  const fd = new FormData();
  fd.append("name", String(payload.name));
  fd.append("status", String(payload.status));
  if (payload.parent !== undefined && payload.parent !== null && payload.parent !== "")
    fd.append("parent", String(payload.parent));
  if (payload.icon) fd.append("icon", payload.icon);
  return api.post(`/admin/categories`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// UPDATE (Laravel: _method=PUT)
export const updateCategory = (id: number, payload: { name: string; status: string | number; parent?: string | number | null; icon?: File | null; }) => {
  const fd = new FormData();
  fd.append("_method", "PUT");
  fd.append("name", String(payload.name));
  fd.append("status", String(payload.status));
  if (payload.parent !== undefined && payload.parent !== null && payload.parent !== "")
    fd.append("parent", String(payload.parent));
  if (payload.icon) fd.append("icon", payload.icon);
  return api.post(`/admin/categories/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE
export const deleteCategory = (id: number) =>
  api.delete(`/admin/categories/${id}`);

// PARENTS
export const getParentCategories = () =>
  api.get<{ status: number; msg: string; data: Category[] }>(`/categories/parents`);

// SUBCATEGORIES (لو الـ API بيدعم ?parent=ID)
export const getSubcategories = (parentId: number, page = 1) =>
  api.get<PaginatedResponse<Category>>(`/admin/categories?parent=${parentId}&page=${page}`);
