<?php

namespace App\Http\Resources\HotelOwner;

use App\Http\Resources\BaseResourceCollection;

class HotelCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return HotelResource::class;
    }
}

