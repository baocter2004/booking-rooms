<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class UserResource extends BaseResource
{
    protected function toList(Request $request): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'avatar' => $this->avatar ? url('storage/' . $this->avatar) : null,
            'phone' => $this->phone,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    protected function toDetail(Request $request): array
    {
        return array_merge($this->toList($request), [
            'bookings' => $this->bookings->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'room_id' => $booking->room_id,
                    'check_in' => $booking->check_in,
                    'check_out' => $booking->check_out,
                    'status' => $booking->status,
                    'total_price' => $booking->total_price,
                    'created_at' => $booking->created_at,
                ];
            }),
            'reviews' => $this->reviews->map(function ($review) {
                return [
                    'id' => $review->id,
                    'booking_id' => $review->booking_id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                ];
            }),
            'appointments' => $this->appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'staff_id' => $appointment->staff_id,
                    'service_id' => $appointment->service_id,
                    'appointment_date' => $appointment->appointment_date,
                    'status' => $appointment->status,
                    'created_at' => $appointment->created_at,
                ];
            }),
        ]);
    }
}
