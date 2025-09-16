import React, { useEffect, useState } from "react";
import { getSliders } from "../services/slidersService";

export default function Slider() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSliders()
      .then((res) => {
        console.log("Sliders response:", res.data);

        const sliderData = res.data?.data;

        // لو الريسبونس أوبجكت → نخليه Array فيها عنصر واحد
        const normalized = Array.isArray(sliderData)
          ? sliderData
          : sliderData
          ? [sliderData]
          : [];

        setSlides(normalized);
      })
      .catch((err) => {
        console.error("Error fetching sliders:", err);
        setSlides([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-700">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Sliders
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">جاري تحميل البيانات...</p>
      ) : slides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slides.map((s: any, index: number) => (
            <div
              key={s.slider_id || index}
              className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition"
            >
              <img
                src={s.file_name}
                alt={s.slider_note || "Slider image"}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                {s.slider_note || "بدون عنوان"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {s.created_at}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد بيانات لعرضها</p>
      )}
    </div>
  );
}
