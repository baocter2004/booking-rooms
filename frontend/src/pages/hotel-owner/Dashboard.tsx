import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, DoorOpen, Users, TrendingUp } from 'lucide-react';

export function HotelOwnerDashboard() {
  const stats = [
    {
      title: 'My Hotels',
      value: '3',
      description: '2 active, 1 pending',
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      title: 'Total Rooms',
      value: '125',
      description: '87 occupied',
      icon: DoorOpen,
      color: 'text-green-600',
    },
    {
      title: 'Staff Members',
      value: '42',
      description: 'Across all hotels',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Monthly Revenue',
      value: '$125,430',
      description: '+24% from last month',
      icon: TrendingUp,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your hotel properties</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Hotels */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>My Hotels</CardTitle>
            <CardDescription>Your hotel properties and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Grand Ocean Hotel', location: 'Da Nang', status: 'Active', rooms: 45 },
                {
                  name: 'Mountain View Resort',
                  location: 'Sapa',
                  status: 'Active',
                  rooms: 52,
                },
                { name: 'City Center Plaza', location: 'Ho Chi Minh', status: 'Pending', rooms: 28 },
              ].map((hotel, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hotel.location} • {hotel.rooms} rooms
                    </p>
                  </div>
                  <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                    hotel.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {hotel.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your hotels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Add New Hotel
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                View All Hotels
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                Manage Staff
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                Revenue Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

