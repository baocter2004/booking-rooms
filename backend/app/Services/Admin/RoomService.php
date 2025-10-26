<?php

namespace App\Services\Admin;

use App\Repositories\RoomRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Support\Arr;

class RoomService extends BaseAdminCrudService
{
    protected function getRepository(): RoomRepository
    {
        if (empty($this->repository)) {
            $this->repository = app()->make(RoomRepository::class);
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
            'hotel',
            'roomType',
            'services',
            'bookings',
            'availabilities'
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
