import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategories, getCategory, getSubcategories } from "../../services/categoryService";
import type { Category } from "../../types/category";

export default function Subcategories() {
  const { id } = useParams();
  const parentId = Number(id);
  const [parent, setParent] = useState<Category | null>(null);
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false); // لو السيرفر مش بيدعم ?parent

  useEffect(() => {
    if (!parentId) return;

    setLoading(true);

    // 1) هات بيانات الأب
    getCategory(parentId).then((res) => setParent(res.data.data)).catch(() => null);

    // 2) جرّب endpoint بـ ?parent
    getSubcategories(parentId)
      .then((res) => {
        setItems(res.data.data.data);
        setFallback(false);
      })
      .catch(async () => {
        // 3) Fallback: هات كل الأقسام وفلتر client-side
        setFallback(true);
        const all = await getCategories(1);
        const list = all.data.data.data.filter((c) => Number(c.parent) === parentId);
        setItems(list);
      })
      .finally(() => setLoading(false));
  }, [parentId]);

  const title = useMemo(
    () => (parent ? `الأقسام الفرعية لـ: ${parent.category_name}` : "الأقسام الفرعية"),
    [parent]
  );

  if (loading) return <div>...جار التحميل</div>;

  return (
    <div>
      <h2>{title}</h2>
      {fallback && <div style={{ color: "#666" }}>✔ تم الاعتماد على تصفية محلية لعدم وجود endpoint مباشر.</div>}

      {items.length === 0 ? (
        <div>لا توجد أقسام فرعية.</div>
      ) : (
        <ul style={{ lineHeight: 2 }}>
          {items.map((c) => (
            <li key={c.category_id}>
              <Link to={`/categories/${c.category_id}`}>{c.category_name}</Link>
              {"  "}- الحالة: {String(c.category_status) === "1" ? "مفعل" : "غير مفعل"}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 12 }}>
        <Link to="/categories">⬅ الرجوع لقائمة الأقسام</Link>
      </div>
    </div>
  );
}
