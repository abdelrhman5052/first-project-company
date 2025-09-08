import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Slider() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/slider")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSlides(res.data);
        } else {
          setSlides([]); // لو رجع Object أو أي حاجة مش Array
        }
      })
      .catch((err) => {
        console.error("Error fetching slider:", err);
        setSlides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
      <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
        Slider
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">جاري تحميل البيانات...</p>
      ) : slides.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {slides.map((s: any) => (
            <div
              key={s.id}
              className="p-4 transition border rounded shadow-sm bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                src={s.image}
                alt={s.title}
                className="object-cover w-full h-40 mb-2 rounded"
              />
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                {s.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات لعرضها</p>
      )}
    </div>
  );
}
