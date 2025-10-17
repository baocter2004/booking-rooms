<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\BaseCrudController;
use App\Http\Requests\Admin\Users\GetUserRequest;
use App\Http\Requests\Admin\Users\PostUserRequest;
use App\Http\Resources\Admin\UserCollection;
use App\Http\Resources\Admin\UserResource;
use App\Services\Admin\UserService;

class UserController extends BaseCrudController
{
    protected function getService(): UserService
    {
        if (empty($this->service)) {
            $this->service = app()->make(UserService::class);
        }

        return $this->service;
    }

    function getFormRequest($id = null): PostUserRequest
    {
        return app()->make(PostUserRequest::class);
    }

    function getListRequest(): GetUserRequest
    {
        return app()->make(GetUserRequest::class);
    }

    function getResourceCollection($data): UserCollection
    {
        return new UserCollection($data);
    }

    function getJsonResource($data): UserResource
    {
        return new UserResource($data, true);
    }
}
