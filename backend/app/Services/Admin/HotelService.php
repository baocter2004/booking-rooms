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

        // dd($params)

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
        if (empty($params)) {
            $params = [
                'relates' => [
                    'rooms.roomType',
                    'staff.staffRole',
                    'services.serviceType',
                    'bookings.user',
                    'appointments',
                    'reviews'
                ],
            ];
        }
        return parent::find($id, $params);
    }
}
