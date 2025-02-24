
export interface User {
  id: string;
  email: string;
  role: "admin" | "staff";
}

export interface Room {
  id: number;
  number: string;
  type: string;
  status: "متاح" | "مشغول" | "صيانة";
  guest_id?: number;
}

export interface Guest {
  id: number;
  name: string;
  phone: string;
  email?: string;
  check_in: Date;
  check_out?: Date;
  room_id?: number;
}

export interface Booking {
  id: number;
  guest_id: number;
  room_id: number;
  check_in: Date;
  check_out: Date;
  status: "نشط" | "منتهي" | "ملغي";
}
