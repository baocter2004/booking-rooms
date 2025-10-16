<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use NotificationConst;

class StaffNotification extends Model
{
    protected $fillable = [
        'staff_id',
        'type',
        'title',
        'message',
        'data',
        'action_url',
        'priority',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'priority' => 'integer',
            'read_at' => 'datetime',
        ];
    }

    // Relationships

    /**
     * Get the staff that owns this notification
     */
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    // Helper methods

    /**
     * Mark notification as read
     */
    public function markAsRead(): void
    {
        $this->update(['read_at' => now()]);
    }

    /**
     * Check if notification is unread
     */
    public function isUnread(): bool
    {
        return is_null($this->read_at);
    }

    /**
     * Check if high priority
     */
    public function isHighPriority(): bool
    {
        return $this->priority >= NotificationConst::PRIORITY_HIGH;
    }

    // Scopes

    /**
     * Scope for unread notifications
     */
    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    /**
     * Scope for read notifications
     */
    public function scopeRead($query)
    {
        return $query->whereNotNull('read_at');
    }

    /**
     * Scope by type
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope by priority
     */
    public function scopeByPriority($query, int $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope for high priority
     */
    public function scopeHighPriority($query)
    {
        return $query->where('priority', '>=', NotificationConst::PRIORITY_HIGH);
    }
}

