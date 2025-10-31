<?php

namespace App\Http\Controllers\Api\HotelOwner;

use App\Http\Controllers\ApiController;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;

class DashboardController extends ApiController
{
    public function index(): JsonResponse
    {
        $ownerId = auth('hotel_owner')->id();

        $stats = [
            'total_hotels' => Hotel::where('hotel_owner_id', $ownerId)->count(),
            'active_hotels' => Hotel::where('hotel_owner_id', $ownerId)->where('status', 1)->count(),
            'total_rooms' => Hotel::where('hotel_owner_id', $ownerId)
                ->withCount('rooms')
                ->get()
                ->sum('rooms_count'),
            'total_staff' => Hotel::where('hotel_owner_id', $ownerId)
                ->withCount('staff')
                ->get()
                ->sum('staff_count'),
            'total_bookings' => Hotel::where('hotel_owner_id', $ownerId)
                ->withCount('bookings')
                ->get()
                ->sum('bookings_count'),
        ];

        $recentHotels = Hotel::where('hotel_owner_id', $ownerId)
            ->with(['images'])
            ->withCount(['rooms', 'staff', 'bookings'])
            ->latest()
            ->take(5)
            ->get();

        return $this->json([
            'stats' => $stats,
            'recent_hotels' => $recentHotels,
        ]);
    }
}
