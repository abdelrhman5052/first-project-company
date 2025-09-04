import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategory } from "../../services/categoryService";
import type { Category } from "../../types/category";

export default function Details() {
  const { id } = useParams();
  const [cat, setCat] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCategory(Number(id))
      .then((res) => setCat(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>...جار التحميل</div>;
  if (!cat) return <div>لا توجد بيانات</div>;

  return (
    <div>
      <h2>تفاصيل القسم</h2>
      <p><b>ID:</b> {cat.category_id}</p>
      <p><b>الاسم:</b> {cat.category_name}</p>
      <p><b>Slug:</b> {cat.category_slug}</p>
      <p><b>الحالة:</b> {String(cat.category_status) === "1" ? "مفعل" : "غير مفعل"}</p>
      <p><b>الأب:</b> {cat.parent ?? "-"}</p>
      {cat.icon && <img src={cat.icon} width={120} />}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <Link to={`/categories/${cat.category_id}/edit`}>تعديل</Link>
        <Link to={`/categories/${cat.category_id}/sub`}>الأقسام الفرعية</Link>
      </div>
    </div>
  );
}
