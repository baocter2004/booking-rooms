<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\BaseCrudController;
use App\Http\Requests\Admin\rooms\GetRoomRequest;
use App\Http\Requests\Admin\rooms\PostRoomRequest;
use App\Http\Resources\Admin\RoomCollection;
use App\Http\Resources\Admin\RoomResource;
use App\Services\Admin\RoomService;

class RoomController extends BaseCrudController
{
    protected function getService(): RoomService
    {
        if (empty($this->service)) {
            $this->service = app()->make(RoomService::class);
        }

        return $this->service;
    }

    function getFormRequest($id = null): PostRoomRequest
    {
        return app()->make(PostRoomRequest::class);
    }

    function getListRequest(): GetRoomRequest
    {
        return app()->make(GetRoomRequest::class);
    }

    function getResourceCollection($data): RoomCollection
    {
        return new RoomCollection($data);
    }

    function getJsonResource($data): RoomResource
    {
        return new RoomResource($data, true);
    }
}
