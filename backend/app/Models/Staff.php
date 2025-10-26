<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Traits\HasRoleGuard;

class Staff extends Authenticatable implements JWTSubject
{
    use HasRoleGuard, SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'avatar',
        'status',
        'hotel_id',
        'staff_role_id',
    ];

     /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => 'integer',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return ['guard' => 'staff'];
    }


    // Relationships

    /**
     * Get the hotel where this staff member works
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the role of this staff member
     */
    public function staffRole(): BelongsTo
    {
        return $this->belongsTo(StaffRole::class);
    }

    /**
     * Get all services this staff member can provide (Many-to-Many)
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_staff')
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    /**
     * Get all appointments assigned to this staff member
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get all notifications for this staff
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(StaffNotification::class);
    }

    /**
     * Get all comments by this staff
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
