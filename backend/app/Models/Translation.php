<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'table_name',
        'column_name',
        'row_id',
        'language',
        'translated_text',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'row_id' => 'integer',
        ];
    }

    /**
     * No direct Eloquent relationships
     * This model uses a custom polymorphic-like pattern
     * where table_name, column_name, and row_id are used
     * to reference any translatable content in the database
     */
}
