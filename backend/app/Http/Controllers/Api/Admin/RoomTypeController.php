<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\BaseCrudController;
use App\Http\Requests\Admin\room_types\GetRoomTypeRequest;
use App\Http\Requests\Admin\room_types\PostRoomTypeRequest;
use App\Http\Resources\Admin\RoomTypeCollection;
use App\Http\Resources\Admin\RoomTypeResource;
use App\Services\Admin\RoomTypeService;

class RoomTypeController extends BaseCrudController
{
    protected function getService(): RoomTypeService
    {
        if(empty($this->service)) {
            $this->service = app()->make(RoomTypeService::class);
        }
        return $this->service;
    }

    function getFormRequest($id = null): PostRoomTypeRequest
    {
        return app()->make(PostRoomTypeRequest::class);
    }

    function getListRequest(): GetRoomTypeRequest
    {
        return app()->make(GetRoomTypeRequest::class);
    }

    function getResourceCollection($data): RoomTypeCollection
    {
        return new RoomTypeCollection($data);
    }

    function getJsonResource($data): RoomTypeResource
    {
        return new RoomTypeResource($data, true);
    }
}
