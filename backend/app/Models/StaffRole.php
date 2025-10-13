<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StaffRole extends Model
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
     * Get all staff members with this role
     */
    public function staff(): HasMany
    {
        return $this->hasMany(Staff::class);
    }
}
