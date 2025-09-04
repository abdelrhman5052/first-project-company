import { useEffect, useState } from "react";
import { getParentCategories } from "../services/categoryService";
import type { Category } from "../types/category";

type Props = {
  initial?: {
    name?: string;
    status?: string | number;
    parent?: string | number | null;
    iconUrl?: string | null;
  };
  onSubmit: (data: {
    name: string;
    status: string | number;
    parent?: string | number | null;
    icon?: File | null;
  }) => Promise<any> | void;
  submitText?: string;
};

export default function CategoryForm({
  initial,
  onSubmit,
  submitText = "حفظ",
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [status, setStatus] = useState<string | number>(initial?.status ?? "1");
  const [parent, setParent] = useState<string | number | null>(
    initial?.parent ?? ""
  );
  const [icon, setIcon] = useState<File | null>(null);
  const [parents, setParents] = useState<Category[]>([]);
  const [loadingParents, setLoadingParents] = useState(true);

  useEffect(() => {
    getParentCategories()
      .then((res) => setParents(res.data.data || []))
      .finally(() => setLoadingParents(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, status, parent, icon });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "480px",
        margin: "20px auto",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Cairo, sans-serif",
      }}
    >
      {/* الاسم */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "6px", fontWeight: 600 }}>الاسم</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      {/* الحالة */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "6px", fontWeight: 600 }}>الحالة</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        >
          <option value="1">مفعّل</option>
          <option value="0">غير مفعّل</option>
        </select>
      </div>

      {/* القسم الأب */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "6px", fontWeight: 600 }}>
          القسم الأب (اختياري)
        </label>
        {loadingParents ? (
          <span style={{ color: "#888", fontSize: "14px" }}>...جار التحميل</span>
        ) : (
          <select
            value={parent ?? ""}
            onChange={(e) => setParent(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="">— بدون —</option>
            {parents.map((p) => (
              <option key={p.category_id} value={p.category_id}>
                {p.category_name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* الصورة الحالية */}
      {initial?.iconUrl && (
        <div>
          <span style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>
            الصورة الحالية:
          </span>
          <img
            src={initial.iconUrl}
            alt="icon"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* الأيقونة الجديدة */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "6px", fontWeight: 600 }}>
          الأيقونة (صورة)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setIcon(e.target.files?.[0] || null)}
          style={{
            border: "1px solid #ccc",
            padding: "6px",
            borderRadius: "6px",
            backgroundColor: "#f9f9f9",
          }}
        />
      </div>

      {/* زر الحفظ */}
      <button
        type="submit"
        style={{
          padding: "12px",
          backgroundColor: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          fontSize: "15px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#1d4ed8";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#2563eb";
        }}
      >
        {submitText}
      </button>
    </form>
  );
}
