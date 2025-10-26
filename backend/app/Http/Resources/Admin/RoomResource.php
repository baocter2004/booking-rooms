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
            'name' => $this->name ?? $this->number,
            'price' => $this->price,
            'status' => $this->status,
            'image_url' => $this->image_url,
            'description' => $this->description,
            'room_type' => $this->roomType ? [
                'id' => $this->roomType->id,
                'name' => $this->roomType->name,
                'display_name' => $this->roomType->display_name ?? $this->roomType->name,
                'capacity' => $this->roomType->capacity ?? null,
                'base_price' => $this->roomType->base_price ?? null,
            ] : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function toDetail(Request $request): array
    {
        $data = $this->toList($request);

        $data['services'] = $this->services->map(function ($service) {
            return [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'price' => $service->price,
                'is_included' => $service->pivot->is_included ?? null,
                'additional_price' => $service->pivot->additional_price ?? null,
            ];
        });

        $data['bookings'] = $this->bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'user_id' => $booking->user_id,
                'check_in' => $booking->check_in,
                'check_out' => $booking->check_out,
                'status' => $booking->status,
                'total_price' => $booking->total_price,
            ];
        });

        $data['availabilities'] = $this->availabilities->map(function ($availability) {
            return [
                'id' => $availability->id,
                'date' => $availability->date,
                'is_available' => $availability->is_available,
            ];
        });

        return $data;
    }
}
