<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Traits\HasRoleGuard;

class Admin extends Authenticatable implements JWTSubject
{
    use HasRoleGuard;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'is_super',
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
            'is_super' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return ['guard' => 'admin'];
    }

    // Relationships

    /**
     * Get all posts authored by this admin
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    /**
     * Get all notifications for this admin
     */
    public function notifications()
    {
        return $this->hasMany(AdminNotification::class);
    }

    /**
     * Get all comments by this admin
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
