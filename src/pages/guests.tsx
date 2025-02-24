
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Guest } from "@/types";
import { toast } from "sonner";

const Guests = () => {
  const [newGuest, setNewGuest] = useState({
    name: "",
    phone: "",
    email: "",
    check_in: new Date(),
  });

  const queryClient = useQueryClient();

  const { data: guests, isLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      const { data, error } = await supabase.from("guests").select("*");
      if (error) throw error;
      return data as Guest[];
    },
  });

  const createGuest = useMutation({
    mutationFn: async (guest: Partial<Guest>) => {
      const { data, error } = await supabase.from("guests").insert([guest]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("تم إضافة النزيل بنجاح");
      setNewGuest({
        name: "",
        phone: "",
        email: "",
        check_in: new Date(),
      });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة النزيل");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGuest.mutate(newGuest);
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold">إدارة النزلاء</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>إضافة نزيل جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name">الاسم</label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">رقم الهاتف</label>
                <Input
                  id="phone"
                  value={newGuest.phone}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="email">البريد الإلكتروني</label>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, email: e.target.value })
                  }
                />
              </div>
            </div>
            <Button type="submit">إضافة نزيل</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guests?.map((guest) => (
          <Card key={guest.id}>
            <CardHeader>
              <CardTitle>{guest.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>رقم الهاتف: {guest.phone}</p>
              {guest.email && <p>البريد الإلكتروني: {guest.email}</p>}
              <p>تاريخ الوصول: {new Date(guest.check_in).toLocaleDateString("ar")}</p>
              {guest.check_out && (
                <p>تاريخ المغادرة: {new Date(guest.check_out).toLocaleDateString("ar")}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Guests;
