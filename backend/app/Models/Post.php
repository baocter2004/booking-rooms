<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'author_id',
        'post_category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'status',
        'is_featured',
        'allow_comments',
        'views',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'integer',
            'is_featured' => 'boolean',
            'allow_comments' => 'boolean',
            'views' => 'integer',
            'published_at' => 'datetime',
        ];
    }

    // Relationships

    /**
     * Get the author (admin) of the post
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'author_id');
    }

    /**
     * Get the category of the post
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }

    /**
     * Get all gallery images for this post
     */
    public function gallery(): HasMany
    {
        return $this->hasMany(PostGallery::class)->orderBy('order');
    }

    /**
     * Get all tags for this post
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(PostTag::class, 'post_post_tag')
            ->withTimestamps();
    }

    /**
     * Get all comments for this post
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get approved comments only
     */
    public function approvedComments(): HasMany
    {
        return $this->hasMany(Comment::class)->where('is_approved', true);
    }

    // Scopes

    /**
     * Scope for published posts
     */
    public function scopePublished($query)
    {
        return $query->where('status', 2)
            ->where('published_at', '<=', now());
    }

    /**
     * Scope for featured posts
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for draft posts
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 1);
    }

    // Helper methods

    /**
     * Increment view count
     */
    public function incrementViews(): void
    {
        $this->increment('views');
    }

    /**
     * Check if post is published
     */
    public function isPublished(): bool
    {
        return $this->status === 2 && $this->published_at <= now();
    }
}

