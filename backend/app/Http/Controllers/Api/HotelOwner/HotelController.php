<?php

namespace App\Http\Controllers\Api\HotelOwner;

use App\Http\Controllers\BaseCrudController;
use App\Http\Requests\HotelOwner\Hotels\GetHotelRequest;
use App\Http\Requests\HotelOwner\Hotels\PostHotelRequest;
use App\Http\Resources\HotelOwner\HotelCollection;
use App\Http\Resources\HotelOwner\HotelResource;
use App\Services\HotelOwner\HotelService;
use Illuminate\Http\JsonResponse;

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

    /**
     * Override edit to verify ownership
     */
    public function edit(int|string $id): HotelResource
    {
        $hotel = $this->service->find($id);
        
        if (!$hotel || $hotel->hotel_owner_id !== auth('hotel_owner')->id()) {
            abort(403, 'You do not have permission to edit this hotel.');
        }

        return parent::edit($id);
    }

    /**
     * Override destroy to verify ownership
     */
    public function destroy($id): JsonResponse
    {
        $hotel = $this->service->find($id);
        
        if (!$hotel || $hotel->hotel_owner_id !== auth('hotel_owner')->id()) {
            return $this->json([
                'status' => false,
                'message' => 'You do not have permission to delete this hotel.'
            ], 403);
        }

        return parent::destroy($id);
    }
}
