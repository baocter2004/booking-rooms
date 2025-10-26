import { useEffect, useState } from 'react';
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
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import type { Room } from '@/types/hotel';
import { getImageUrl } from '@/utils/image';

export function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, fetchHotel } = useHotels();

  const [roomsPage, setRoomsPage] = useState(1);
  const [staffPage, setStaffPage] = useState(1);
  const roomsPerPage = 5;
  const staffPerPage = 5;
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHotel(Number(id), roomsPage, roomsPerPage, staffPage, staffPerPage);
    }
  }, [id]);

  const handleRoomsPageChange = async (page: number) => {
    setRoomsLoading(true);
    setRoomsPage(page);
    if (id) {
      await fetchHotel(Number(id), page, roomsPerPage, staffPage, staffPerPage, true);
    }
    setRoomsLoading(false);
  };

  const handleStaffPageChange = async (page: number) => {
    setStaffLoading(true);
    setStaffPage(page);
    if (id) {
      await fetchHotel(Number(id), roomsPage, roomsPerPage, page, staffPerPage, true);
    }
    setStaffLoading(false);
  };

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
          <p className="text-muted-foreground mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
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
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/hotels')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">{hotel.name}</h1>
            <p className="text-muted-foreground mt-1">Hotel Details</p>
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
                src={getImageUrl(hotel.image_url)}
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
                <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
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
            Rooms {hotel?.rooms_paginated && `(${hotel.rooms_paginated.meta.total})`}
          </h2>
          <Button variant="outline" size="sm">
            Manage Rooms
          </Button>
        </div>

        {roomsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !hotel?.rooms_paginated || hotel.rooms_paginated.data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BedDouble className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No rooms available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotel.rooms_paginated.data.map((room: Room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.room_type?.name || 'N/A'}</TableCell>
                      <TableCell>{room.description || 'N/A'}</TableCell>
                      <TableCell>{room.price.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            room.status
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}
                        >
                          {room.status ? 'Available' : 'Unavailable'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {hotel.rooms_paginated.meta.last_page > 1 && (
              <Pagination
                currentPage={hotel.rooms_paginated.meta.current_page}
                totalPages={hotel.rooms_paginated.meta.last_page}
                onPageChange={handleRoomsPageChange}
              />
            )}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff {hotel?.staff_paginated && `(${hotel.staff_paginated.meta.total})`}
          </h2>
          <Button variant="outline" size="sm">
            Manage Staff
          </Button>
        </div>

        {staffLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !hotel?.staff_paginated || hotel.staff_paginated.data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No staff available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotel.staff_paginated.data.map((staff: any) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {staff.staff_role?.name || 'N/A'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {hotel.staff_paginated.meta.last_page > 1 && (
              <Pagination
                currentPage={hotel.staff_paginated.meta.current_page}
                totalPages={hotel.staff_paginated.meta.last_page}
                onPageChange={handleStaffPageChange}
              />
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
