<?php

namespace App\Services\Admin;

use App\Repositories\RoomTypeRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Support\Arr;

class RoomTypeService extends BaseAdminCrudService
{
    protected function getRepository(): RoomTypeRepository
    {
        if (empty($this->repository)) {
            $this->repository = app()->make(RoomTypeRepository::class);
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
        $relates = Arr::get($params, 'relates', []);

        if (!empty($params['from_date'])) {
            $whereEquals[] = ['created_at', '>=', $params['from_date']];
        }

        if (!empty($params['to_date'])) {
            $whereEquals[] = ['created_at', '<=', $params['to_date']];
        }

        if (!empty($params['from_base_price'])) {
            $whereEquals[] = ['base_price', '>=', $params['from_base_price']];
        }

        if (!empty($params['to_base_price'])) {
            $whereEquals[] = ['base_price', '<=', $params['to_base_price']];
        }

        if (!empty($params['name'])) {
            $whereLikes['name'] = $params['name'];
        }

        if (!empty($params['display_name'])) {
            $whereLikes['display_name'] = $params['display_name'];
        }

        if (!empty($params['description'])) {
            $whereLikes['description'] = $params['description'];
        }

        if (!empty($params['capacity'])) {
            $wheres['capacity'] = $params['capacity'];
        }

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
