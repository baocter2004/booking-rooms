import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHotels } from '@/hooks/admin/useHotels';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Building2,
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Loader2Icon,
  BedDouble,
  Users,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, fetchHotel } = useHotels();

  useEffect(() => {
    if (id) {
      fetchHotel(Number(id));
    }
  }, [id, fetchHotel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The hotel you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/admin/hotels')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hotels
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/admin/hotels')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {hotel.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Hotel Details
            </p>
          </div>
        </div>
        <Button onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)} className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Hotel
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {hotel.image_url ? (
              <img
                src={hotel.image_url}
                alt={hotel.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-24 w-24 text-primary" />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Hotel Information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{hotel.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{hotel.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{hotel.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {hotel.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {hotel.description}
                </p>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {hotel.created_at ? new Date(hotel.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {hotel.updated_at ? new Date(hotel.updated_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BedDouble className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.rooms_count || 0}</p>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.staff_count || 0}</p>
              <p className="text-sm text-muted-foreground">Staff Members</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.bookings_count || 0}</p>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.services_count || 0}</p>
              <p className="text-sm text-muted-foreground">Services</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BedDouble className="h-5 w-5" />
            Rooms
          </h2>
          <Button variant="outline" size="sm">
            Manage Rooms
          </Button>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <BedDouble className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Room Price</TableHead>
                <TableHead>Room Status</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff
          </h2>
          <Button variant="outline" size="sm">
            Manage Staff
          </Button>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Staff management coming soon</p>
        </div>
      </Card>
    </div>
  );
}

