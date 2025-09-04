export interface Category {
    category_id: number;
    category_name: string;
    category_slug: string;
    category_status: "0" | "1" | number | string;
    icon: string | null;
    parent: number | null | string; // السيرفر أحيانًا بيبعته null أو رقم/نص
    created_at?: string;
  }
  
  export interface PaginatedResponse<T> {
    status: number;
    msg: string;
    data: {
      data: T[];
      links: any;
      meta: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
      }
    }
  }
  