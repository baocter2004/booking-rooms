import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export function HotelCreate() {
  const navigate = useNavigate();
  const { createHotel, loading } = useHotels();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      image_url: '',
    },
  });

  const imageUrl = watch('image_url');

  const onSubmit = async (data: HotelFormData) => {
    setIsSubmitting(true);
    const success = await createHotel(data);
    setIsSubmitting(false);

    if (success) {
      navigate('/admin/hotels');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
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
            <Building2 className="h-8 w-8 text-primary" />
            Create New Hotel
          </h1>
          <p className="text-muted-foreground mt-1">
            Add a new hotel to your system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
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

        {/* Future: Rooms Section */}
        <Card className="p-6 bg-muted/30">
          <h2 className="text-xl font-bold mb-4">Rooms</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">Save the hotel first, then you can add rooms.</p>
            <p className="text-sm">Room management will be available after creation.</p>
          </div>
        </Card>

        {/* Future: Services Section */}
        <Card className="p-6 bg-muted/30">
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">Save the hotel first, then you can add services.</p>
            <p className="text-sm">Service management will be available after creation.</p>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-6">
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/hotels')}
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Hotel
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

