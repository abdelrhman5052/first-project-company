import React, { useEffect, useState } from "react";
import { getAds, deleteAd, addAd, updateAd } from "../services/adsService";

export default function Ads() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // مودال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState<any>(null);
  const [form, setForm] = useState<{ title: string; desc: string; image: File | null }>({
    title: "",
    desc: "",
    image: null,
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = () => {
    setLoading(true);
    getAds()
      .then((res) => {
        const data = res.data?.data || [];
        setAds(Array.isArray(data) ? data : [data]); // بعض الـ APIs بترجع object واحد
      })
      .catch(() => setAds([]))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الإعلان؟")) {
      deleteAd(id)
        .then(() => {
          alert("تم حذف الإعلان ✅");
          fetchAds();
        })
        .catch(() => alert("حدث خطأ أثناء الحذف ❌"));
    }
  };

  const handleEdit = (ad: any) => {
    setCurrentAd(ad);
    setForm({
      title: ad.ad_title,
      desc: ad.ad_desc,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentAd(null);
    setForm({ title: "", desc: "", image: null });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAd) {
      updateAd(currentAd.ad_id, form).then(() => {
        alert("تم تعديل الإعلان ✅");
        setIsModalOpen(false);
        fetchAds();
      });
    } else {
      addAd(form).then(() => {
        alert("تمت إضافة الإعلان ✅");
        setIsModalOpen(false);
        fetchAds();
      });
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900 dark:border dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">الإعلانات</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + إضافة إعلان
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">جاري تحميل الإعلانات...</p>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ads.map((ad, index) => (
            <div
              key={ad.ad_id || index}
              className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition"
            >
              <img
                src={ad.image}
                alt={ad.ad_title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                {ad.ad_title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{ad.ad_desc}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(ad)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(ad.ad_id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">لا توجد إعلانات</p>
      )}

      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {currentAd ? "تعديل الإعلان" : "إضافة إعلان جديد"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="عنوان الإعلان"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded p-2"
                required
              />
              <textarea
                placeholder="وصف الإعلان"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files ? e.target.files[0] : null })
                }
                className="w-full border rounded p-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
