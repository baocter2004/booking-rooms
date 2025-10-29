import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Eye, Edit, Trash2, MapPin, Users, DoorOpen } from 'lucide-react';

export function HotelOwnerHotelList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  const hotels = [
    {
      id: 1,
      name: 'Grand Ocean Hotel',
      address: '123 Beach Road, Da Nang',
      phone: '0236 3812345',
      email: 'info@grandocean.com',
      image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      status: 1,
      rooms_count: 45,
      staff_count: 15,
      bookings_count: 120,
    },
    {
      id: 2,
      name: 'Mountain View Resort',
      address: '456 Highland Street, Sapa',
      phone: '0214 3871234',
      email: 'contact@mountainview.com',
      image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      status: 1,
      rooms_count: 52,
      staff_count: 18,
      bookings_count: 98,
    },
  ];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Hotels</h2>
          <p className="text-muted-foreground">Manage your hotel properties</p>
        </div>
        <Button onClick={() => navigate('/hotel-owner/hotels/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Hotel
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search hotels..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hotels Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${hotel.image_url})` }}
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{hotel.name}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {hotel.address}
                  </CardDescription>
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    hotel.status === 1
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {hotel.status === 1 ? 'Active' : 'Inactive'}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium">{hotel.rooms_count}</div>
                  <div className="text-xs text-muted-foreground">Rooms</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium">{hotel.staff_count}</div>
                  <div className="text-xs text-muted-foreground">Staff</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium">{hotel.bookings_count}</div>
                  <div className="text-xs text-muted-foreground">Bookings</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/hotel-owner/hotels/${hotel.id}`)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/hotel-owner/hotels/${hotel.id}/edit`)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No hotels found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? 'Try a different search term' : 'Start by adding your first hotel'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

