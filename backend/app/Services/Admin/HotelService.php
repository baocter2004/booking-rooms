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
        $sort = Arr::get($params, 'sort', 'created_at:desc');
        $relates = Arr::get($params, 'relates', [
            'services',
            'rooms',
            'staff',
            'bookings',
            'appointments',
            'reviews'
        ]);

        return [
            'wheres' => $wheres,
            'likes' => $whereLikes,
            'where_equals' => $whereEquals,
            'where_ins' => $whereIns,
            'sort' => $sort,
            'relates' => $relates,
        ];
    }
}
