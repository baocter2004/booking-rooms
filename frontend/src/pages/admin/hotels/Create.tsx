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
import { CurrencyInput } from '@/components/ui/currency-input';
import { hotelSchema, type HotelFormData } from '@/validates/admin/hotelSchema';
import type { RoomFormData, ServiceFormData } from '@/types/hotel';
import { Building2, ArrowLeft, Save, Loader2Icon, Plus, Trash2, DoorOpen, Sparkles } from 'lucide-react';
import { getImageUrl } from '@/utils/image';

export function HotelCreate() {
  const navigate = useNavigate();
  const { createHotel, loading } = useHotels();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<RoomFormData[]>([]);
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [hotelImages, setHotelImages] = useState<string[]>([]);

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
    const success = await createHotel({
      ...data,
      images: hotelImages,
      rooms: rooms.map(room => ({
        name: room.name,
        price: room.price,
        description: room.description,
        image_url: room.image_url,
        images: room.images || [],
        number: `${Date.now()}`,
        room_type_id: 1,
      })),
      services: services.map(service => ({
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description,
        image_url: service.image_url,
        service_type_id: 1,
      })),
    });
    setIsSubmitting(false);

    if (success) {
      navigate('/admin/hotels');
    }
  };

  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        id: `temp-${Date.now()}`,
        name: '',
        price: 0,
        description: '',
        image_url: '',
        images: [],
      },
    ]);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const updateRoom = (id: string, field: keyof RoomFormData, value: any) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, [field]: value } : room)));
  };

  const addService = () => {
    setServices([
      ...services,
      {
        id: `temp-${Date.now()}`,
        name: '',
        price: 0,
        duration: 0,
        description: '',
        image_url: '',
      },
    ]);
  };

  const removeService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const updateService = (id: string, field: keyof ServiceFormData, value: any) => {
    setServices(services.map((service) => (service.id === id ? { ...service, [field]: value } : service)));
  };

  const addHotelImage = (url: string) => {
    if (hotelImages.length < 5) {
      setHotelImages([...hotelImages, url]);
    }
  };

  const removeHotelImage = (index: number) => {
    setHotelImages(hotelImages.filter((_, i) => i !== index));
  };

  const addRoomImage = (roomId: string, url: string) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId && (room.images?.length || 0) < 5
          ? { ...room, images: [...(room.images || []), url] }
          : room,
      ),
    );
  };

  const removeRoomImage = (roomId: string, index: number) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, images: room.images?.filter((_, i) => i !== index) } : room,
      ),
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/admin/hotels')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Create New Hotel
          </h1>
          <p className="text-muted-foreground mt-1">Add a new hotel to your system</p>
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
                <Input id="name" placeholder="Grand Hotel" isInvalid={!!errors.name} {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
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
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input id="phone" placeholder="+1234567890" isInvalid={!!errors.phone} {...register('phone')} />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Hotel Image</Label>
                <ImageUpload
                  value={imageUrl}
                  onChange={(url: string) => setValue('image_url', url)}
                  folder="hotels"
                  disabled={isSubmitting || loading}
                />
                {errors.image_url && <p className="text-sm text-destructive">{errors.image_url.message}</p>}
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
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
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
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Additional Hotel Images (Max 5)</Label>
              <div className="space-y-3">
                {hotelImages.length < 5 && (
                  <div>
                    <ImageUpload value="" onChange={addHotelImage} folder="hotels" disabled={isSubmitting || loading} />
                  </div>
                )}
                {hotelImages.length > 0 && (
                  <div className="grid grid-cols-5 gap-3">
                    {hotelImages.map((image, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={getImageUrl(image)}
                          alt={`Hotel ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border-2"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={() => removeHotelImage(index)}
                          disabled={isSubmitting || loading}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{hotelImages.length} / 5 images uploaded</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <DoorOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Rooms</h2>
              <span className="text-sm text-muted-foreground">
                ({rooms.length} room{rooms.length !== 1 ? 's' : ''})
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRoom}
              disabled={isSubmitting || loading}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </div>

          {rooms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
              <DoorOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="mb-2">No rooms added yet</p>
              <p className="text-sm">Click "Add Room" to start adding rooms to this hotel.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rooms.map((room, index) => (
                <Card key={room.id} className="p-4 border-2">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold">Room #{index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRoom(room.id!)}
                      disabled={isSubmitting || loading}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>
                        Room Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. Deluxe Suite"
                        value={room.name}
                        onChange={(e) => updateRoom(room.id!, 'name', e.target.value)}
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Price per Night <span className="text-destructive">*</span>
                      </Label>
                      <CurrencyInput
                        placeholder="1,000,000"
                        value={room.price}
                        onChange={(value) => updateRoom(room.id!, 'price', value)}
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <textarea
                        rows={2}
                        placeholder="Describe the room..."
                        value={room.description}
                        onChange={(e) => updateRoom(room.id!, 'description', e.target.value)}
                        disabled={isSubmitting || loading}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Room Image</Label>
                      <ImageUpload
                        value={room.image_url}
                        onChange={(url: string) => updateRoom(room.id!, 'image_url', url)}
                        folder="rooms"
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Additional Room Images (Max 5)</Label>
                      <div className="space-y-2">
                        {(room.images?.length || 0) < 5 && (
                          <div>
                            <ImageUpload
                              value=""
                              onChange={(url: string) => addRoomImage(room.id!, url)}
                              folder="rooms"
                              disabled={isSubmitting || loading}
                            />
                          </div>
                        )}
                        {(room.images?.length || 0) > 0 && (
                          <div className="grid grid-cols-5 gap-2">
                            {(room.images || []).map((image, idx) => (
                              <div key={idx} className="relative group aspect-square">
                                <img
                                  src={getImageUrl(image)}
                                  alt={`Room ${idx + 1}`}
                                  className="w-full h-full object-cover rounded-lg border-2"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  onClick={() => removeRoomImage(room.id!, idx)}
                                  disabled={isSubmitting || loading}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">{room.images?.length || 0} / 5 images</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Services</h2>
              <span className="text-sm text-muted-foreground">
                ({services.length} service{services.length !== 1 ? 's' : ''})
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addService}
              disabled={isSubmitting || loading}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
              <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="mb-2">No services added yet</p>
              <p className="text-sm">Click "Add Service" to start adding services to this hotel.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service, index) => (
                <Card key={service.id} className="p-4 border-2">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold">Service #{index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(service.id!)}
                      disabled={isSubmitting || loading}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>
                        Service Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. Spa Treatment"
                        value={service.name}
                        onChange={(e) => updateService(service.id!, 'name', e.target.value)}
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Price <span className="text-destructive">*</span>
                      </Label>
                      <CurrencyInput
                        placeholder="500,000"
                        value={service.price}
                        onChange={(value) => updateService(service.id!, 'price', value)}
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>
                        Duration (minutes) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="number"
                        placeholder="60"
                        value={service.duration}
                        onChange={(e) => updateService(service.id!, 'duration', parseInt(e.target.value) || 0)}
                        disabled={isSubmitting || loading}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <textarea
                        rows={2}
                        placeholder="Describe the service..."
                        value={service.description}
                        onChange={(e) => updateService(service.id!, 'description', e.target.value)}
                        disabled={isSubmitting || loading}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Service Image</Label>
                      <ImageUpload
                        value={service.image_url}
                        onChange={(url: string) => updateService(service.id!, 'image_url', url)}
                        folder="services"
                        disabled={isSubmitting || loading}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

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
            <Button type="submit" disabled={isSubmitting || loading} className="gap-2">
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
