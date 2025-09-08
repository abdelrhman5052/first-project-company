import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Ads() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/ads")
      .then((res) => {
        const data = res.data;
        setAds(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching ads:", err);
        setAds([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
      <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
        الإعلانات
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">جاري تحميل الإعلانات...</p>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ads.map((ad: any) => (
            <div
              key={ad.id}
              className="p-4 transition border rounded shadow-sm bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="object-cover w-full h-40 mb-2 rounded"
              />
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                {ad.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{ad.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد إعلانات</p>
      )}
    </div>
  );
}
