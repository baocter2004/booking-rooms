import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHotels } from '@/hooks/admin/useHotels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { hotelSchema, type HotelFormData } from '@/validates/admin/hotelSchema';
import {
  Building2,
  ArrowLeft,
  Save,
  Loader2Icon,
} from 'lucide-react';

export function HotelEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotel, loading, fetchHotel, updateHotel } = useHotels();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
  });

  const imageUrl = watch('image_url');

  useEffect(() => {
    if (id) {
      fetchHotel(Number(id));
    }
  }, [id, fetchHotel]);

  useEffect(() => {
    if (hotel) {
      setValue('name', hotel.name);
      setValue('address', hotel.address);
      setValue('phone', hotel.phone);
      setValue('email', hotel.email);
      setValue('description', hotel.description || '');
      setValue('image_url', hotel.image_url || '');
    }
  }, [hotel, setValue]);

  const onSubmit = async (data: HotelFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    const success = await updateHotel(Number(id), data);
    setIsSubmitting(false);

    if (success) {
      navigate(`/admin/hotels/${id}`);
    }
  };

  if (loading && !hotel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The hotel you're trying to edit doesn't exist or has been removed.
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(`/admin/hotels/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Edit Hotel
          </h1>
          <p className="text-muted-foreground mt-1">
            Update hotel information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Basic Information</h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Hotel Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Grand Hotel"
                  isInvalid={!!errors.name}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hotel@example.com"
                  isInvalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  isInvalid={!!errors.phone}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Hotel Image</Label>
                <ImageUpload
                  value={imageUrl}
                  onChange={(url) => setValue('image_url', url)}
                  folder="hotels"
                  disabled={isSubmitting || loading}
                />
                {errors.image_url && (
                  <p className="text-sm text-destructive">{errors.image_url.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                placeholder="123 Main St, City, Country"
                isInvalid={!!errors.address}
                {...register('address')}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe your hotel..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 bg-muted/30">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold">{hotel.rooms_count || 0}</p>
              <p className="text-sm text-muted-foreground">Rooms</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.staff_count || 0}</p>
              <p className="text-sm text-muted-foreground">Staff</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{hotel.bookings_count || 0}</p>
              <p className="text-sm text-muted-foreground">Bookings</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Services</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-6">
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/hotels/${id}`)}
              disabled={isSubmitting || loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="gap-2"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

