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
        return $this->toList($request);
    }
}
