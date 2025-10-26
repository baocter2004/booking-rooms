<?php

namespace App\Services\Admin;

use App\Models\Hotel;
use App\Repositories\HotelRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HotelService extends BaseAdminCrudService
{
    protected function getRepository(): HotelRepository
    {
        if (empty($this->repository)) {
            $this->repository = app()->make(HotelRepository::class);
        }

        return $this->repository;
    }

    protected function buildFilterParams(array $params = []): array
    {
        $wheres = Arr::get($params, 'wheres', []);
        $whereEquals = Arr::get($params, 'where_equals', []);
        $whereIns = Arr::get($params, 'where_ins', []);
        $whereLikes = Arr::get($params, 'likes', []);
        $orWheres = Arr::get($params, 'or_wheres', []);
        $sort = Arr::get($params, 'sort', 'created_at:desc');
        $relates = Arr::get($params, 'relates', []);
        $relatesCount = Arr::get($params, 'relates_count', ['rooms', 'staff', 'bookings', 'services']);

        if (!empty($params['from_date'])) {
            $whereEquals[] = ['created_at', '>=', $params['from_date']];
        }

        if (!empty($params['to_date'])) {
            $whereEquals[] = ['created_at', '<=', $params['to_date']];
        }

        if (!empty($params['search'])) {
            $searchTerm = $params['search'];
            $orWheres[] = ['name', 'LIKE', '%' . $searchTerm . '%'];
            $orWheres[] = ['address', 'LIKE', '%' . $searchTerm . '%'];
            $orWheres[] = ['email', 'LIKE', '%' . $searchTerm . '%'];
            $orWheres[] = ['phone', 'LIKE', '%' . $searchTerm . '%'];
        }

        if (!empty($params['name'])) {
            $whereLikes['name'] = $params['name'];
        }

        if (!empty($params['address'])) {
            $whereLikes['address'] = $params['address'];
        }

        if (!empty($params['email'])) {
            $whereLikes['email'] = $params['email'];
        }

        if (!empty($params['phone'])) {
            $whereLikes['phone'] = $params['phone'];
        }

        return [
            'wheres' => $wheres,
            'likes' => $whereLikes,
            'or_wheres' => $orWheres,
            'where_equals' => $whereEquals,
            'where_ins' => $whereIns,
            'sort' => $sort,
            'relates' => $relates,
            'relates_count' => $relatesCount,
        ];
    }

    public function create(array $params = []): Model
    {
        return DB::transaction(function () use ($params) {
            $hotelData = Arr::only($params, [
                'name',
                'address',
                'phone',
                'email',
                'description',
                'image_url'
            ]);

            $hotel = parent::create($hotelData);

            if (!empty($params['images']) && is_array($params['images'])) {
                foreach ($params['images'] as $index => $imageUrl) {
                    $hotel->images()->create([
                        'image_url' => $imageUrl,
                        'order' => $index,
                    ]);
                }
            }

            if (!empty($params['services']) && is_array($params['services'])) {
                foreach ($params['services'] as $serviceData) {
                    $hotel->services()->create([
                        'service_type_id' => $serviceData['service_type_id'],
                        'name' => $serviceData['name'],
                        'description' => $serviceData['description'] ?? null,
                        'price' => $serviceData['price'] ?? 0,
                        'duration' => $serviceData['duration'] ?? null,
                        'image_url' => $serviceData['image_url'] ?? null,
                    ]);
                }
            }

            if (!empty($params['rooms']) && is_array($params['rooms'])) {
                foreach ($params['rooms'] as $roomData) {
                    $room = $hotel->rooms()->create([
                        'room_type_id' => $roomData['room_type_id'],
                        'number' => $roomData['number'],
                        'price' => $roomData['price'],
                        'status' => $roomData['status'] ?? \App\Constants\RoomConst::AVAILABLE,
                        'image_url' => $roomData['image_url'] ?? null,
                        'description' => $roomData['description'] ?? null,
                    ]);

                    if (!empty($roomData['images']) && is_array($roomData['images'])) {
                        foreach ($roomData['images'] as $index => $imageUrl) {
                            $room->images()->create([
                                'image_url' => $imageUrl,
                                'order' => $index,
                            ]);
                        }
                    }
                }
            }

            if (!empty($params['staff']) && is_array($params['staff'])) {
                foreach ($params['staff'] as $staffData) {
                    $hotel->staff()->create([
                        'staff_role_id' => $staffData['staff_role_id'],
                        'name' => $staffData['name'],
                        'email' => $staffData['email'],
                        'password' => $staffData['password'],
                        'phone' => $staffData['phone'] ?? null,
                        'avatar' => $staffData['avatar'] ?? null,
                        'status' => $staffData['status'] ?? \App\Constants\StaffConst::ACTIVE,
                    ]);
                }
            }

            return $hotel->load(['services.serviceType', 'rooms.roomType', 'staff.staffRole', 'images', 'rooms.images']);
        });
    }

    public function update(int|string $id, array $params = []): Hotel
    {
        return DB::transaction(function () use ($id, $params) {
            $hotelData = Arr::only($params, [
                'name',
                'address',
                'phone',
                'email',
                'description',
                'image_url'
            ]);

            $hotel = parent::update($id, $hotelData);

            if (isset($params['images']) && is_array($params['images'])) {
                $hotel->images()->delete();
                foreach ($params['images'] as $index => $imageUrl) {
                    $hotel->images()->create([
                        'image_url' => $imageUrl,
                        'order' => $index,
                    ]);
                }
            }

            if (isset($params['services']) && is_array($params['services'])) {
                if (isset($params['replace_services']) && $params['replace_services']) {
                    $hotel->services()->delete();
                }

                foreach ($params['services'] as $serviceData) {
                    if (isset($serviceData['id'])) {
                        $service = $hotel->services()->find($serviceData['id']);
                        if ($service) {
                            $service->update([
                                'service_type_id' => $serviceData['service_type_id'] ?? $service->service_type_id,
                                'name' => $serviceData['name'] ?? $service->name,
                                'description' => $serviceData['description'] ?? $service->description,
                                'price' => $serviceData['price'] ?? $service->price,
                                'duration' => $serviceData['duration'] ?? $service->duration,
                                'image_url' => $serviceData['image_url'] ?? $service->image_url,
                            ]);
                        }
                    } else {
                        $hotel->services()->create([
                            'service_type_id' => $serviceData['service_type_id'],
                            'name' => $serviceData['name'],
                            'description' => $serviceData['description'] ?? null,
                            'price' => $serviceData['price'] ?? 0,
                            'duration' => $serviceData['duration'] ?? null,
                            'image_url' => $serviceData['image_url'] ?? null,
                        ]);
                    }
                }
            }

            if (isset($params['rooms']) && is_array($params['rooms'])) {
                foreach ($params['rooms'] as $roomData) {
                    if (isset($roomData['id'])) {
                        $room = $hotel->rooms()->find($roomData['id']);
                        if ($room) {
                            $room->update([
                                'room_type_id' => $roomData['room_type_id'] ?? $room->room_type_id,
                                'number' => $roomData['number'] ?? $room->number,
                                'price' => $roomData['price'] ?? $room->price,
                                'status' => $roomData['status'] ?? $room->status,
                                'image_url' => $roomData['image_url'] ?? $room->image_url,
                                'description' => $roomData['description'] ?? $room->description,
                            ]);

                            if (isset($roomData['images']) && is_array($roomData['images'])) {
                                $room->images()->delete();
                                foreach ($roomData['images'] as $index => $imageUrl) {
                                    $room->images()->create([
                                        'image_url' => $imageUrl,
                                        'order' => $index,
                                    ]);
                                }
                            }
                        }
                    } else {
                        $room = $hotel->rooms()->create([
                            'room_type_id' => $roomData['room_type_id'],
                            'number' => $roomData['number'],
                            'price' => $roomData['price'],
                            'status' => $roomData['status'] ?? \App\Constants\RoomConst::AVAILABLE,
                            'image_url' => $roomData['image_url'] ?? null,
                            'description' => $roomData['description'] ?? null,
                        ]);

                        if (!empty($roomData['images']) && is_array($roomData['images'])) {
                            foreach ($roomData['images'] as $index => $imageUrl) {
                                $room->images()->create([
                                    'image_url' => $imageUrl,
                                    'order' => $index,
                                ]);
                            }
                        }
                    }
                }
            }

            if (isset($params['staff']) && is_array($params['staff'])) {
                foreach ($params['staff'] as $staffData) {
                    if (isset($staffData['id'])) {
                        $staff = $hotel->staff()->find($staffData['id']);
                        if ($staff) {
                            $updateData = [
                                'staff_role_id' => $staffData['staff_role_id'] ?? $staff->staff_role_id,
                                'name' => $staffData['name'] ?? $staff->name,
                                'email' => $staffData['email'] ?? $staff->email,
                                'phone' => $staffData['phone'] ?? $staff->phone,
                                'avatar' => $staffData['avatar'] ?? $staff->avatar,
                                'status' => $staffData['status'] ?? $staff->status,
                            ];
                            if (!empty($staffData['password'])) {
                                $updateData['password'] = $staffData['password'];
                            }
                            $staff->update($updateData);
                        }
                    } else {
                        $hotel->staff()->create([
                            'staff_role_id' => $staffData['staff_role_id'],
                            'name' => $staffData['name'],
                            'email' => $staffData['email'],
                            'password' => $staffData['password'],
                            'phone' => $staffData['phone'] ?? null,
                            'avatar' => $staffData['avatar'] ?? null,
                            'status' => $staffData['status'] ?? \App\Constants\StaffConst::ACTIVE,
                        ]);
                    }
                }
            }

            return $hotel->load(['services.serviceType', 'rooms.roomType', 'staff.staffRole', 'images', 'rooms.images']);
        });
    }
    
    public function find(int|string $id, array $params = []): ?Hotel
    {
        $roomsPage = request()->input('rooms_page');
        $roomsPerPage = request()->input('rooms_per_page');
        $staffPage = request()->input('staff_page');
        $staffPerPage = request()->input('staff_per_page');
        $shouldPaginateRelations = $roomsPage || $staffPage;

        if (empty($params)) {
            $params = [
                'relates' => $shouldPaginateRelations ? [] : [
                    'services',
                    'bookings',
                    'appointments',
                    'reviews'
                ],
                'relates_count' => ['rooms', 'staff', 'bookings', 'services']
            ];
        }

        $hotel = parent::find($id, $params);

        if (!$hotel || !$shouldPaginateRelations) {
            return $hotel;
        }

        if ($roomsPage && $roomsPerPage) {
            $rooms = $hotel->rooms()
                ->with(['roomType'])
                ->orderBy('created_at', 'desc')
                ->paginate($roomsPerPage, ['*'], 'rooms_page', $roomsPage);

            $hotel->setRelation('rooms_paginated', [
                'data' => $rooms->items(),
                'meta' => [
                    'current_page' => $rooms->currentPage(),
                    'per_page' => $rooms->perPage(),
                    'total' => $rooms->total(),
                    'last_page' => $rooms->lastPage(),
                ]
            ]);
        }

        if ($staffPage && $staffPerPage) {
            $staff = $hotel->staff()
                ->with(['staffRole'])
                ->orderBy('created_at', 'desc')
                ->paginate($staffPerPage, ['*'], 'staff_page', $staffPage);

            $hotel->setRelation('staff_paginated', [
                'data' => $staff->items(),
                'meta' => [
                    'current_page' => $staff->currentPage(),
                    'per_page' => $staff->perPage(),
                    'total' => $staff->total(),
                    'last_page' => $staff->lastPage(),
                ]
            ]);
        }

        return $hotel;
    }
}
