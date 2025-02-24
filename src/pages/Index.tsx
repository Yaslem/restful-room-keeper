
import { useState } from "react";
import {
  Hotel,
  Users,
  CalendarDays,
  Menu,
  ChevronLeft,
  Search,
  BedDouble,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for demonstration
  const rooms = [
    { id: 1, number: "١٠١", type: "فاخرة", status: "متاح", guest: null },
    { id: 2, number: "١٠٢", type: "جناح", status: "مشغول", guest: "أحمد محمد" },
    { id: 3, number: "١٠٣", type: "قياسية", status: "صيانة", guest: null },
    { id: 4, number: "١٠٤", type: "فاخرة", status: "متاح", guest: null },
    { id: 5, number: "١٠٥", type: "جناح", status: "مشغول", guest: "سارة أحمد" },
  ];

  const stats = [
    { title: "إجمالي الغرف", value: "٥٠", icon: Hotel },
    { title: "الغرف المشغولة", value: "٣٢", icon: BedDouble },
    { title: "النزلاء", value: "٤٥", icon: Users },
    { title: "الحجوزات", value: "١٢", icon: CalendarDays },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">نظام إدارة الفندق</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-right"
            >
              <Hotel className="ml-2 h-5 w-5" />
              لوحة التحكم
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-right"
            >
              <BedDouble className="ml-2 h-5 w-5" />
              الغرف
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-right"
            >
              <Users className="ml-2 h-5 w-5" />
              النزلاء
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-right"
            >
              <CalendarDays className="ml-2 h-5 w-5" />
              الحجوزات
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "mr-64" : "mr-0"
        }`}
      >
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="relative flex-1 max-w-xl mx-auto">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="البحث عن غرف، نزلاء، أو حجوزات..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="hotel-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rooms Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.id} className="hotel-card">
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
                  <CardDescription>{room.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  {room.guest && (
                    <p className="text-sm text-gray-600">النزيل: {room.guest}</p>
                  )}
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      التفاصيل
                    </Button>
                    <Button size="sm">
                      {room.status === "متاح" ? "تسجيل دخول" : "تسجيل خروج"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
