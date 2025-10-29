<?php

namespace App\Http\Resources\HotelOwner;

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
            'status' => $this->status,
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
        $data = $this->toList($request);

        if ($this->images) {
            $data['images'] = $this->images->map(function($image) {
                return [
                    'id' => $image->id,
                    'image_url' => $image->image_url,
                    'order' => $image->order,
                ];
            });
        }

        if ($this->services) {
            $data['services'] = $this->services->map(function($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->price,
                    'duration' => $service->duration,
                    'image_url' => $service->image_url,
                    'service_type' => $service->serviceType ? [
                        'id' => $service->serviceType->id,
                        'name' => $service->serviceType->name,
                    ] : null,
                ];
            });
        }

        if ($this->rooms) {
            $data['rooms'] = $this->rooms->map(function($room) {
                return [
                    'id' => $room->id,
                    'number' => $room->number,
                    'price' => $room->price,
                    'status' => $room->status,
                    'image_url' => $room->image_url,
                    'description' => $room->description,
                    'room_type' => $room->roomType ? [
                        'id' => $room->roomType->id,
                        'name' => $room->roomType->name,
                    ] : null,
                ];
            });
        }

        if ($this->staff) {
            $data['staff'] = $this->staff->map(function($staff) {
                return [
                    'id' => $staff->id,
                    'name' => $staff->name,
                    'email' => $staff->email,
                    'phone' => $staff->phone,
                    'avatar' => $staff->avatar,
                    'status' => $staff->status,
                    'staff_role' => $staff->staffRole ? [
                        'id' => $staff->staffRole->id,
                        'name' => $staff->staffRole->name,
                    ] : null,
                ];
            });
        }

        return $data;
    }
}

