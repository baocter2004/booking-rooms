<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\BaseCrudController;
use App\Http\Requests\Admin\hotels\GetHotelRequest;
use App\Http\Requests\Admin\hotels\PostHotelRequest;
use App\Http\Resources\Admin\HotelCollection;
use App\Http\Resources\Admin\HotelResource;
use App\Services\Admin\HotelService;

class HotelController extends BaseCrudController
{
    protected function getService(): HotelService
    {
        if (empty($this->service)) {
            $this->service = app()->make(HotelService::class);
        }

        return $this->service;
    }

     function getFormRequest($id = null): PostHotelRequest
    {
        return app()->make(PostHotelRequest::class);
    }

    function getListRequest(): GetHotelRequest
    {
        return app()->make(GetHotelRequest::class);
    }

    function getResourceCollection($data): HotelCollection
    {
        return new HotelCollection($data);
    }

    function getJsonResource($data): HotelResource
    {
        return new HotelResource($data, true);
    }
}
