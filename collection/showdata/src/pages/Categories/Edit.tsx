import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../components/CategoryForm";
import { getCategory, updateCategory } from "../../services/categoryService";
import type { Category } from "../../types/category";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [cat, setCat] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCategory(Number(id))
      .then((res) => setCat(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    if (!id) return;
    await updateCategory(Number(id), data);
    alert("تم التعديل بنجاح");
    nav(`/categories/${id}`);
  };

  if (loading) return <div>...جار التحميل</div>;
  if (!cat) return <div>لا توجد بيانات</div>;

  return (
    <div>
      <h2>تعديل قسم</h2>
      <CategoryForm
        initial={{
          name: cat.category_name,
          status: cat.category_status,
          parent: cat.parent ?? "",
          iconUrl: cat.icon || null,
        }}
        onSubmit={onSubmit}
        submitText="تعديل"
      />
    </div>
  );
}
