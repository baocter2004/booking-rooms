<?php

namespace App\Services\Admin;

use App\Repositories\HotelRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Support\Arr;

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

    public function find(int|string $id, array $params = []): ?\Illuminate\Database\Eloquent\Model
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
