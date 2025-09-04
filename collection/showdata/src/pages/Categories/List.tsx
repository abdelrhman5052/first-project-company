import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCategory, getCategories } from "../../services/categoryService";
import type { Category } from "../../types/category";
import "../Categories/List.css"; // استدعاء ملف CSS

export default function List() {
  const [data, setData] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getCategories(page)
      .then((res) => {
        setData(res.data.data.data);
        const m = res.data.data.meta;
        setMeta({
          current_page: m.current_page,
          last_page: m.last_page,
          total: m.total,
          per_page: m.per_page,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page]);

  const onDelete = async (id: number) => {
    if (!confirm("متأكد من الحذف؟")) return;
    await deleteCategory(id);
    load();
  };

  if (loading) return <div className="loading">...جار التحميل</div>;

  return (
    <div className="list-container">
      <h2 className="list-title">📂 الأقسام</h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>الاسم</th>
            <th>الأب</th>
            <th>الحالة</th>
            <th>الأيقونة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.category_id}>
              <td>{c.category_id}</td>
              <td>
                <Link to={`/categories/${c.category_id}`} className="link">
                  {c.category_name}
                </Link>
              </td>
              <td>{c.parent ?? "-"}</td>
              <td>
                {String(c.category_status) === "1" ? (
                  <span className="status active">مفعل</span>
                ) : (
                  <span className="status inactive">غير مفعل</span>
                )}
              </td>
              <td>
                {c.icon ? (
                  <img src={c.icon} width={40} height={40} className="icon" />
                ) : (
                  "-"
                )}
              </td>
              <td className="actions">
                <Link to={`/categories/${c.category_id}`} className=" boo ">
                  تفاصيل
                </Link>
                <Link to={`/categories/${c.category_id}/edit`} className=" boo green">
                  تعديل
                </Link>
                <Link to={`/categories/${c.category_id}/sub`} className=" boo orange">
                  الأقسام الفرعية
                </Link>
                <button onClick={() => onDelete(c.category_id)} className="btn red">
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn gray"
        >
          السابق
        </button>
        <span>
          صفحة {meta.current_page} من {meta.last_page}
        </span>
        <button
          disabled={page >= meta.last_page}
          onClick={() => setPage((p) => p + 1)}
          className="btn gray"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
