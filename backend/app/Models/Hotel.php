<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Hotel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'description',
        'image_url',
    ];

    // Relationships

    /**
     * Get all services offered by this hotel
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Get all rooms in this hotel
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    /**
     * Get all staff members working at this hotel
     */
    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class);
    }

    /**
     * Get all bookings made at this hotel
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get all appointments at this hotel
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get all reviews through bookings at this hotel
     */
    public function reviews(): HasManyThrough
    {
        return $this->hasManyThrough(Review::class, Booking::class);
    }
}
