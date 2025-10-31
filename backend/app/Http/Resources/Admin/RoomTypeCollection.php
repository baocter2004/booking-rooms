<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResourceCollection;

class RoomTypeCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return RoomTypeResource::class;
    }
}