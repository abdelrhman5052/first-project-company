import { useNavigate } from "react-router-dom";

import { addCategory } from "../../services/categoryService";
import CategoryForm from '../../components/CategoryForm';

export default function Add() {
  const nav = useNavigate();
  const onSubmit = async (data: any) => {
    await addCategory(data);
    alert("تمت الإضافة بنجاح");
    nav("/categories");
  };

  return (
    <div>
      <h2>إضافة قسم</h2>
      <CategoryForm onSubmit={onSubmit} submitText="إضافة" />
    </div>
  );
}
