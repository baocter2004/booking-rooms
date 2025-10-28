<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResource;
use Illuminate\Http\Request;

class RoomTypeResource extends BaseResource
{
    protected function toList(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'display_name' => $this->display_name,
            'base_price' => $this->base_price,
            'description' => $this->description,
            'capacity' => $this->capacity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

    protected function toDetail(Request $request): array {
        return $this->toList($request);
    }
}