import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UserHome() {
  const featuredHotels = [
    {
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      rating: 4.8,
      price: 250,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    },
    {
      name: 'Sunset Beach Resort',
      location: 'Malibu, California',
      rating: 4.9,
      price: 350,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    },
    {
      name: 'Mountain View Lodge',
      location: 'Aspen, Colorado',
      rating: 4.7,
      price: 200,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
        <h1 className="mb-4 text-4xl font-bold">Find Your Perfect Stay</h1>
        <p className="mb-6 text-lg opacity-90">
          Discover amazing hotels and resorts for your next adventure
        </p>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search destinations, hotels..."
              className="pl-10 bg-white dark:bg-gray-800"
            />
          </div>
          <Button size="lg" variant="secondary">
            Search
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next check-in: Dec 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Hotels</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visited Places</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Countries explored</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Hotels */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Hotels</h2>
            <p className="text-muted-foreground">Top-rated destinations for your next trip</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <Badge variant="secondary">
                    <Star className="mr-1 h-3 w-3 fill-current" />
                    {hotel.rating}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">${hotel.price}</span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                  <Button>Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

