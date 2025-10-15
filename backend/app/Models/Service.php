<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'image_url',
        'service_type_id',
        'hotel_id'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'duration' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the service type that this service belongs to
     */
    public function serviceType(): BelongsTo
    {
        return $this->belongsTo(ServiceType::class);
    }

    /**
     * Get the hotel that offers this service
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get all rooms that offer this service (Many-to-Many)
     */
    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'room_service')
            ->withPivot('is_included', 'additional_price')
            ->withTimestamps();
    }

    /**
     * Get all bookings that include this service (Many-to-Many)
     */
    public function bookings(): BelongsToMany
    {
        return $this->belongsToMany(Booking::class, 'booking_services')
            ->withPivot('quantity', 'price', 'scheduled_time', 'notes')
            ->withTimestamps();
    }

    /**
     * Get all staff members who can provide this service (Many-to-Many)
     */
    public function staff(): BelongsToMany
    {
        return $this->belongsToMany(Staff::class, 'service_staff')
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    /**
     * Get all appointments for this service
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get all availability records for this service
     */
    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }
}
