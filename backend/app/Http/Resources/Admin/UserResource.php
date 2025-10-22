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
            'username' => $this->username,
            'avatar' => $this->avatar ? url('storage/' . $this->avatar) : null,
        ];
    }

    protected function toDetail(Request $request): array
    {
        return $this->toList($request);
    }
}
