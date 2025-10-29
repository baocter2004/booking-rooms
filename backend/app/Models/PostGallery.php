<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostGallery extends Model
{
    protected $table = 'post_gallery';

    protected $fillable = [
        'post_id',
        'image_path',
        'caption',
        'alt_text',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    // Relationships

    /**
     * Get the post that owns this gallery image
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
