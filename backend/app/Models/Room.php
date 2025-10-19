<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'hotel_id',
        'room_type_id',
        'number',
        'price',
        'status',
        'image_url',
        'description',
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
            'status' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the hotel that this room belongs to
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the room type of this room
     */
    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    /**
     * Get all services available for this room (Many-to-Many)
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'room_service')
            ->withPivot('is_included', 'additional_price')
            ->withTimestamps();
    }

    /**
     * Get all bookings for this room
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get all availability records for this room
     */
    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }
}
