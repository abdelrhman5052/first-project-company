import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        const data = res.data;
        // ✅ تأكد أنه Array قبل ما نعمل map
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        الأقسام
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">جاري تحميل البيانات...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map((c: any) => (
            <div
              key={c.id}
              className="p-4 transition border rounded shadow-sm bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {c.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد أقسام لعرضها</p>
      )}
    </div>
  );
}
