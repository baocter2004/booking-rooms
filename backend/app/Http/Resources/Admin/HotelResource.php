<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class HotelResource extends BaseResource
{
    protected function toList(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'rooms_count' => $this->rooms_count ?? 0,
            'staff_count' => $this->staff_count ?? 0,
            'bookings_count' => $this->bookings_count ?? 0,
            'services_count' => $this->services_count ?? 0,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function toDetail(Request $request): array
    {
        return array_merge($this->toList($request), [
            'services' => $this->services,
            'rooms' => RoomResource::collection($this->rooms),
            'staff' => $this->staff,
            'bookings' => $this->bookings,
            'appointments' => $this->appointments,
            'reviews' => $this->reviews,
        ]);
    }
}
