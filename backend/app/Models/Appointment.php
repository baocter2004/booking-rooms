<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'hotel_id',
        'service_id',
        'staff_id',
        'start_time',
        'end_time',
        'price',
        'notes',
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
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'price' => 'decimal:2',
            'status' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the user who made this appointment
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the hotel where this appointment is scheduled
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the service for this appointment
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the staff member assigned to this appointment (nullable)
     */
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
