import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Calendar, DoorOpen, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function StaffDashboard() {
  const todayTasks = [
    {
      title: 'Today\'s Check-ins',
      value: '8',
      description: '3 pending confirmations',
      icon: ClipboardList,
      color: 'text-blue-600',
    },
    {
      title: 'My Assignments',
      value: '12',
      description: '5 rooms to clean',
      icon: Calendar,
      color: 'text-green-600',
    },
    {
      title: 'Room Status',
      value: '15/20',
      description: 'Rooms ready',
      icon: DoorOpen,
      color: 'text-purple-600',
    },
    {
      title: 'Completed Tasks',
      value: '24',
      description: 'Today',
      icon: CheckCircle,
      color: 'text-yellow-600',
    },
  ];

  const upcomingTasks = [
    { room: '101', task: 'Cleaning', time: '10:00 AM', status: 'pending' },
    { room: '205', task: 'Check-in', time: '11:30 AM', status: 'in-progress' },
    { room: '304', task: 'Maintenance', time: '02:00 PM', status: 'pending' },
    { room: '407', task: 'Check-out', time: '12:00 PM', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Staff Dashboard</h2>
        <p className="text-muted-foreground">Your tasks and schedule for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {todayTasks.map((stat, index) => (
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

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your assigned tasks for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    {task.room}
                  </div>
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-muted-foreground">{task.time}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    task.status === 'completed'
                      ? 'default'
                      : task.status === 'in-progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

