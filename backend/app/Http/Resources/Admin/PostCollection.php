<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResourceCollection;

class PostCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return PostResource::class;
    }
}