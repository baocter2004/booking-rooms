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
        $whereIns = Arr::get($params, 'where_ins', []);
        $whereLikes = Arr::get($params, 'likes', []);
        $sort = Arr::get($params, 'sort', 'created_at:desc');
        $relates = Arr::get($params, 'relates', []);

        return [
            'wheres' => $wheres,
            'likes' => $whereLikes,
            'where_ins' => $whereIns,
            'sort' => $sort,
            'relates' => $relates,
        ];
    }
}
