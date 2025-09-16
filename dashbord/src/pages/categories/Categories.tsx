import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoreService";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    category_id: null,
    category_name: "",
    category_status: "1",
    icon: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔄 تحميل البيانات
  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then((res) => {
        console.log("✅ API Response:", res.data);
        const categoryData = res.data?.data || [];
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✨ فتح المودال
  const openModal = (category: any = null) => {
    if (category) {
      setFormData({
        category_id: category.category_id,
        category_name: category.category_name,
        category_status: category.category_status,
        icon: null,
      });
    } else {
      setFormData({
        category_id: null,
        category_name: "",
        category_status: "1",
        icon: null,
      });
    }
    setIsModalOpen(true);
  };

  // ✨ حفظ (إضافة/تعديل)
  const handleSave = async () => {
    try {
      if (formData.category_id) {
        await updateCategory(formData.category_id, {
          category_name: formData.category_name,
          category_status: formData.category_status,
          icon: formData.icon,
        });
      } else {
        await addCategory({
          category_name: formData.category_name,
          category_status: formData.category_status,
          icon: formData.icon,
        });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  // ✨ حذف
  const handleDelete = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          جدول الأقسام
        </h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + إضافة قسم
        </button>
      </div>

      {/* الجدول */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">⏳ جاري تحميل البيانات...</p>
      ) : categories.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">الاسم</th>
                <th className="border px-4 py-2">الحالة</th>
                <th className="border px-4 py-2">الأيقونة</th>
                <th className="border px-4 py-2">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c: any) => (
                <tr key={c.category_id}>
                  <td className="border px-4 py-2">{c.category_id}</td>
                  <td className="border px-4 py-2">{c.category_name}</td>
                  <td className="border px-4 py-2">
                    {c.category_status === "1" ? "✅ مفعل" : "❌ معطل"}
                  </td>
                  <td className="border px-4 py-2">
                    {c.icon && (
                      <img
                        src={c.icon}
                        alt={c.category_name}
                        className="w-10 h-10 object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(c)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(c.category_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد أقسام</p>
      )}

      {/* 🟢 المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {formData.category_id ? "تعديل القسم" : "إضافة قسم"}
            </h2>

            <input
              type="text"
              placeholder="اسم القسم"
              value={formData.category_name}
              onChange={(e) =>
                setFormData({ ...formData, category_name: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <select
              value={formData.category_status}
              onChange={(e) =>
                setFormData({ ...formData, category_status: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
            >
              <option value="1">مفعل</option>
              <option value="0">معطل</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.files?.[0] || null })
              }
              className="w-full mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
