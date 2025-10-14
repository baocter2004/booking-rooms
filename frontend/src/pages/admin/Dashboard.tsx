import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DoorOpen, Calendar, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,345',
      description: '+12% from last month',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Bookings',
      value: '145',
      description: '+5% from last week',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'Total Rooms',
      value: '87',
      description: '8 available now',
      icon: DoorOpen,
      color: 'text-purple-600',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      description: '+18% from last month',
      icon: DollarSign,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
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

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activities in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Room {100 + item}</p>
                    <p className="text-sm text-muted-foreground">
                      Booked by John Doe #{item}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">$500</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Add New Room
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                View All Bookings
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                Manage Staff
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
                Generate Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

