
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Room } from "@/types";
import { toast } from "sonner";

const Rooms = () => {
  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "قياسية",
    status: "متاح",
  });

  const queryClient = useQueryClient();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) throw error;
      return data as Room[];
    },
  });

  const createRoom = useMutation({
    mutationFn: async (room: Partial<Room>) => {
      const { data, error } = await supabase.from("rooms").insert([room]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("تم إضافة الغرفة بنجاح");
      setNewRoom({ number: "", type: "قياسية", status: "متاح" });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الغرفة");
    },
  });

  const deleteRoom = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("rooms").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("تم حذف الغرفة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الغرفة");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRoom.mutate(newRoom);
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold">إدارة الغرف</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>إضافة غرفة جديدة</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="number">رقم الغرفة</label>
                <Input
                  id="number"
                  value={newRoom.number}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, number: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>نوع الغرفة</label>
                <Select
                  value={newRoom.type}
                  onValueChange={(value) =>
                    setNewRoom({ ...newRoom, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="قياسية">قياسية</SelectItem>
                    <SelectItem value="فاخرة">فاخرة</SelectItem>
                    <SelectItem value="جناح">جناح</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>الحالة</label>
                <Select
                  value={newRoom.status}
                  onValueChange={(value) =>
                    setNewRoom({ ...newRoom, status: value as Room["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متاح">متاح</SelectItem>
                    <SelectItem value="مشغول">مشغول</SelectItem>
                    <SelectItem value="صيانة">صيانة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">إضافة الغرفة</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>غرفة {room.number}</CardTitle>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    room.status === "متاح"
                      ? "bg-green-100 text-green-800"
                      : room.status === "مشغول"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {room.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">النوع: {room.type}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => deleteRoom.mutate(room.id)}
                >
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
