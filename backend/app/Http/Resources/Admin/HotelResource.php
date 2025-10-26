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
        $data = $this->toList($request);

        if (isset($this->rooms_paginated['data'])) {
            $data['rooms_paginated'] = [
                'data' => RoomResource::collection(collect($this->rooms_paginated['data']))->resolve(),
                'meta' => $this->rooms_paginated['meta']
            ];
        }

        if (isset($this->staff_paginated['data'])) {
            $data['staff_paginated'] = [
                'data' => collect($this->staff_paginated['data'])->map(function($staff) {
                    return [
                        'id' => $staff->id,
                        'name' => $staff->name ?? '',
                        'email' => $staff->email ?? '',
                        'phone' => $staff->phone ?? '',
                        'staff_role' => $staff->staffRole ? [
                            'id' => $staff->staffRole->id,
                            'name' => $staff->staffRole->name,
                        ] : null,
                    ];
                }),
                'meta' => $this->staff_paginated['meta']
            ];
        }

        if ($this->services) {
            $data['services'] = $this->services;
        }

        if ($this->bookings) {
            $data['bookings'] = $this->bookings;
        }

        if ($this->appointments) {
            $data['appointments'] = $this->appointments;
        }

        if ($this->reviews) {
            $data['reviews'] = $this->reviews;
        }

        return $data;
    }
}
