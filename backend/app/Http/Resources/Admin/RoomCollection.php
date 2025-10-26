<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Admin\RoomResource;
use App\Http\Resources\BaseResourceCollection;

class RoomCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return RoomResource::class;
    }
}
