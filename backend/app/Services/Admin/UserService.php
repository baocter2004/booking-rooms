<?php

namespace App\Services\Admin;

use App\Repositories\UserRepository;
use App\Services\BaseAdminCrudService;
use Illuminate\Support\Arr;

class UserService extends BaseAdminCrudService
{
    protected function getRepository(): UserRepository
    {
        if (empty($this->repository)) {
            $this->repository = app()->make(UserRepository::class);
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


        if (!empty($params['name'])) {
            $whereLikes['name'] = $params['name'];
        }

        if (!empty($params['phone'])) {
            $whereLikes['phone'] = $params['phone'];
        }

        if (!empty($params['email'])) {
            $whereLikes['email'] = $params['email'];
        }

        return [
            'wheres' => $wheres,
            'likes' => $whereLikes,
            'where_equals' => $whereEquals,
            'where_ins' => $whereIns,
            'sort' => $sort,
            'relates' => ['bookings', 'reviews', 'appointments'],
        ];
    }
}
