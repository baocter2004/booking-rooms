<?php 

namespace App\Http\Resources\Admin;

use BaseResourceCollection;

class UserCollection extends BaseResourceCollection
{
    protected function getResourceName(): string
    {
        return UserResource::class;
    }
}