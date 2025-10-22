<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class RoomResource extends BaseResource
{
    protected function toList(Request $request): array
    {
        return [
            'id' => $this->id,
            'hotel_id' => $this->hotel_id,
            'room_type_id' => $this->room_type_id,
            'number' => $this->number,
            'price' => $this->price,
            'status' => $this->status,
            'image_url' => $this->image_url,
            'description' => $this->description,

            'hotel' => $this->hotel ? [
                'id' => $this->hotel->id,
                'name' => $this->hotel->name,
                'address' => $this->hotel->address,
                'phone' => $this->hotel->phone,
            ] : null,
            'room_type' => $this->roomType ? [
                'id' => $this->roomType->id,
                'name' => $this->roomType->name,
                'display_name' => $this->roomType->display_name,
                'capacity' => $this->roomType->capacity,
                'base_price' => $this->roomType->base_price,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function toDetail(Request $request): array
    {
        return array_merge($this->toList($request), [
            'services' => $this->services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->price,
                    'is_included' => $service->pivot->is_included,
                    'additional_price' => $service->pivot->additional_price,
                ];
            }),
            'bookings' => $this->bookings->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'check_in' => $booking->check_in,
                    'check_out' => $booking->check_out,
                    'status' => $booking->status,
                    'total_price' => $booking->total_price,
                ];
            }),
            'availabilities' => $this->availabilities->map(function ($availability) {
                return [
                    'id' => $availability->id,
                    'date' => $availability->date,
                    'is_available' => $availability->is_available,
                ];
            }),
        ]);
    }
}
