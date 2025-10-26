<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'booking_id',
        'rating',
        'cleanliness_rating',
        'service_rating',
        'facilities_rating',
        'location_rating',
        'value_rating',
        'comment',
        'images',
        'hotel_response',
        'hotel_response_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'cleanliness_rating' => 'integer',
            'service_rating' => 'integer',
            'facilities_rating' => 'integer',
            'location_rating' => 'integer',
            'value_rating' => 'integer',
            'images' => 'array',
            'hotel_response_at' => 'datetime',
        ];
    }

    // Relationships

    /**
     * Get the user who wrote this review
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the booking being reviewed
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
