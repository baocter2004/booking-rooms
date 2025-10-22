<?php 

namespace App\Http\Resources\Admin;

use App\Http\Resources\BaseResourceCollection;

class UserCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return UserResource::class;
    }
}