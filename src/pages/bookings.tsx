
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Booking } from "@/types";

const Bookings = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*");
      if (error) throw error;
      return data as Booking[];
    },
  });

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold">إدارة الحجوزات</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings?.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>حجز #{booking.id}</CardTitle>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    booking.status === "نشط"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "منتهي"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p>من: {new Date(booking.check_in).toLocaleDateString("ar")}</p>
              <p>إلى: {new Date(booking.check_out).toLocaleDateString("ar")}</p>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
