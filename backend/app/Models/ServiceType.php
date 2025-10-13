<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    // Relationships

    /**
     * Get all services of this type
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
