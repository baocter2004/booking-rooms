import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCog } from 'lucide-react';

export function StaffLogin() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/staff/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-500/20 via-teal-500/20 to-cyan-500/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <UserCog className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Staff Portal</CardTitle>
          <CardDescription className="text-base">
            Sign in to access your staff dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="staff@booking.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In as Staff
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <a href="/admin/login" className="text-primary hover:underline">
                Admin Login
              </a>
              {' | '}
              <a href="/user/login" className="text-primary hover:underline">
                User Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

