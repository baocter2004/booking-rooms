<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'hotel_id',
        'room_id',
        'checkin_date',
        'checkout_date',
        'guests',
        'room_price',
        'services_price',
        'total_price',
        'special_requests',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'checkin_date' => 'date',
            'checkout_date' => 'date',
            'guests' => 'integer',
            'room_price' => 'decimal:2',
            'services_price' => 'decimal:2',
            'total_price' => 'decimal:2',
            'status' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the user who made this booking
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the hotel where this booking was made
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the room that was booked
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get all additional services for this booking (Many-to-Many)
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'booking_services')
            ->withPivot('quantity', 'price', 'scheduled_time', 'notes')
            ->withTimestamps();
    }

    /**
     * Get the review for this booking
     */
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }
}
