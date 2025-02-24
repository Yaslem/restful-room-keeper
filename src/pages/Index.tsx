
import { useState } from "react";
import {
  Hotel,
  Users,
  CalendarDays,
  Menu,
  ChevronRight,
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
    { id: 1, number: "101", type: "Deluxe", status: "available", guest: null },
    { id: 2, number: "102", type: "Suite", status: "occupied", guest: "John Doe" },
    { id: 3, number: "103", type: "Standard", status: "maintenance", guest: null },
    { id: 4, number: "104", type: "Deluxe", status: "available", guest: null },
    { id: 5, number: "105", type: "Suite", status: "occupied", guest: "Jane Smith" },
  ];

  const stats = [
    { title: "Total Rooms", value: "50", icon: Hotel },
    { title: "Occupied", value: "32", icon: BedDouble },
    { title: "Guests", value: "45", icon: Users },
    { title: "Bookings", value: "12", icon: CalendarDays },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Hotel Manager</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
            >
              <Hotel className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
            >
              <BedDouble className="mr-2 h-5 w-5" />
              Rooms
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
            >
              <Users className="mr-2 h-5 w-5" />
              Guests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Bookings
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search rooms, guests, or bookings..."
                className="w-full pl-10"
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
                    <CardTitle>Room {room.number}</CardTitle>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        room.status === "available"
                          ? "bg-green-100 text-green-800"
                          : room.status === "occupied"
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
                    <p className="text-sm text-gray-600">Guest: {room.guest}</p>
                  )}
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                    <Button size="sm">
                      {room.status === "available" ? "Check In" : "Check Out"}
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
